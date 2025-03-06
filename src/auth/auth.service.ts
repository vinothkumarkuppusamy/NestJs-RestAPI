import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJWTPayload } from './types/auth-jwt';
import refreshJwtConfig from './config/refresh.jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';
import { handleResponse } from 'src/helpers/statuscode.helper';
import { currentUser } from './types/currentUser';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordMatch = await compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException({
        code: 401,
        message: 'Invalid credentials',
      });
    }
    return {
      id: user.id,
      email: user.email,
      role: user.role,
    };
  }
  async login(userId: number, name: string, role: string) {
    const payload: AuthJWTPayload = {
      sub: userId,
      name: name,
      role: role,
    };
    const { token, refreshToken } = await this.generateToken(payload);
    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashRefreshToken);
    return {
      id: userId,
      token,
      refreshToken,
    };
  }
  async generateToken(payload: AuthJWTPayload) {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);
    return {
      token,
      refreshToken,
    };
  }
  async refreshToken(userId: number, name: string, role: string) {
    const payload: AuthJWTPayload = {
      sub: userId,
      name: name,
      role: role,
    };
    
    const { token, refreshToken } = await this.generateToken(payload);
    const hashRefreshToken = await argon2.hash(refreshToken);
    await this.userService.updateRefreshToken(userId, hashRefreshToken);
    return {
      id: userId,
      token,
      refreshToken,
    };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.hashRefreshToken)
      throw new UnauthorizedException('Invalid refresh token');
    const isRefreshTokenMatch = await argon2.verify(
      user.hashRefreshToken,
      refreshToken
    );
    if (!isRefreshTokenMatch)
      throw new UnauthorizedException('Invalid Refresh Token');
    return {
      id: userId,
    };
  }
  async validateGoogleUser(googleUser: CreateUserDto){
    const user = await this.userService.findByEmail(googleUser.email);
    if(user) return user; 
    return await this.userService.create(googleUser)
  }
  async signOut(userId: number){
    const updateDoc = await this.userService.updateRefreshToken(userId, null);
    if(updateDoc){
      return handleResponse(true, 'User signed out successfully');
    }
    else{
      return handleResponse(false, 'Failed to sign out user');
    }
  };


  async validateJwtUser(userId: number){
    const user = await this.userService.findOne(userId);
    if(!user){
      throw new UnauthorizedException('Invalid user');
      }
      const currentUser:currentUser= {userId: user.id, role: user.role}
      return currentUser; 
  }
}
