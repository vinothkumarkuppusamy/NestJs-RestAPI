import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Pubilc } from './decorators/public.decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UseGuards(AuthGuard('local')) // If call login API first the njs call useGuard-authGuard local strategy (local.strategy.ts)
  
  @Pubilc()
  @UseGuards(LocalAuthGuard) // this is another method for call AuthGuard local function method
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user.id, req.user.name, req.user.role);
  }
  
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    return this.authService.refreshToken(
      req.user.id,
      req.user.name,
      req.user.role,
    );
  }
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  async signOut(@Request() req) {
    return this.authService.signOut(req.user.id);
  }
}
