import { Body, Controller, Get, HttpCode, Param, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { createAuthDto } from './dto/createAuth.dto';
import { idparamsPipe } from './dto/idParams.dto';

@Controller('authentication')
export class AuthenticationController {
    @Get()
    @HttpCode(202)
    getUser(@Query("id") Param: idparamsPipe){
        return 'This is a signup endpoint';
    }   
    @Post()
    //@UsePipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}))
    //@HttpCode(201)
    createUser(@Body() Body: createAuthDto){
        return Body;
    }

}
