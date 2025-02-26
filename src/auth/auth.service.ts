import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJWTPayload } from './types/auth-jwt';
import refreshJwtConfig from './config/refresh.jwt.config';
import { ConfigType } from '@nestjs/config';

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
  login(userId: number, name: string, role: string) {
    const payload: AuthJWTPayload = {
      sub: userId,
      name: name,
      role: role,
    };
    const token = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig);
    return {
      id: userId,
      token,
      refreshToken,
    };
  }
  refreshToken(userId: number, name: string, role: string) {
    const payload: AuthJWTPayload = {
      sub: userId,
      name: name,
      role: role,
    };
    const token = this.jwtService.sign(payload);
    return {
      id: userId,
      token,
    };
  }
}
