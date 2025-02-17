import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller('')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private configService: ConfigService, // create configSevice object
  ) {}

  @Get()
  getHello(): string {
    return this.configService.get('dbConfig.dev n.type'); // It takes pgconfig  port value // 3000
  }
}
