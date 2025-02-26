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

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync(jwtConfig.asProvider()), // call factory function of jwtConfig asProvider()
    ConfigModule.forFeature(jwtConfig),  // call jwtconfig module
    ConfigModule.forFeature(refreshJwtConfig)
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    UserService, 
    LocalStrategy, 
    jwtStrategy,
    RefreshjwtStrategy
  ],
})
export class AuthModule {}
