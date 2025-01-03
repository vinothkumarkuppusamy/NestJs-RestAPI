import { Controller, Get } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
    @Get()
    signup(){
        return 'This is a signup endpoint';
    }
}
