import { Module, ValidationPipe } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
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
