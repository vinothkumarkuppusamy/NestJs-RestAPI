import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  //@UseGuards(AuthGuard('local')) // If call login API first the njs call useGuard-authGuard local strategy (local.strategy.ts)
  @UseGuards(LocalAuthGuard) // this is another method for call AuthGuard local function method
  @Post("login")
  async login(@Request() req){
    const token = this.authService.login(req.user.id)
    return {id: req.user.id, token};
  }
}
