import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { jwtStrategy } from './strategies/jwt.strategy';
import refreshJwtConfig from './config/refresh.jwt.config';
import { RefreshjwtStrategy } from './strategies/refresh.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import googleOauthConfig from './config/google-oauth.config';
import { googleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()), // call factory function of jwtConfig asProvider()
    ConfigModule.forFeature(jwtConfig),  // call jwtconfig module
    ConfigModule.forFeature(refreshJwtConfig),
    ConfigModule.forFeature(googleOauthConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    LocalStrategy, 
    jwtStrategy,
    RefreshjwtStrategy,
    googleStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard  // @useGuards(JWTAuthGuard) applied on all API endpoints
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard  // @useGuards(RoleGuard) applied on all API endpoints
    }
  ],
})
export class AuthModule {}
