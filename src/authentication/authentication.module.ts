import { Module, ValidationPipe } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
@Module({
  controllers: [AuthenticationController],
  // Request validation for module level
  // providers:[{
  //   provide: 'APP_PIPE',
  //   useValue: new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //     transformOptions: {
  //       enableImplicitConversion: true,
  //     }
  //   }) 
  // }
  // ],
})
export class AuthenticationModule {}
