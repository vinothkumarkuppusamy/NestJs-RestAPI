import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { createAuthDto } from './dto/createAuth.dto';
import { idparamsPipe } from './dto/idParams.dto';
import { ZodValidationPipe } from './pipes/ZodValidationPipe';
import { createAuthSchema, createAuthZodDto } from './dto/createAuthZod.dto';
import { headerDto } from './dto/header.dto';
import { RequestHeader } from './pipes/requestHeaderPipe';

@Controller('authentication')
export class AuthenticationController {
  @Get()
  @HttpCode(202)
  getUser(@Query('id') Param: idparamsPipe) {
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
  getFunction(@Param("id") id, @RequestHeader(new ValidationPipe(
    { validateCustomDecorators: true})) head: headerDto ) {
    return head;  
  }
}
