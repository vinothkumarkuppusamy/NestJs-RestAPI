import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { createAuthSchema, createAuthZodDto } from './dto/createAuthZod.dto';
import { AuthenticationService } from './authentication.service';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';

@Controller('authentication')
export class AuthenticationController {
constructor(private authenticationService: AuthenticationService){}
  @Get()
  @HttpCode(202)
  getUser(
   // @Query('id') Param: idparamsPipe
  ) {
    return 'This is a signup endpoint';
  }
  @Post()
  //@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
  //@HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAuthSchema))
  createUser(@Body() Body: createAuthZodDto) {
    return Body;
  }
  @Patch(':id')
  getFunction(
    //@Param("id") id, @RequestHeader(new ValidationPipe({ validateCustomDecorators: true})) head: headerDto 
) {
   
  }
}
