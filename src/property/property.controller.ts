import { Controller, Get, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
// interface Service{
//     findAll()
//     create()
//     update()
// }
@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService){}
    @Get()
    findAll(){
       this.propertyService.findAll()
    }
    @Post()
    @UsePipes(new ValidationPipe())
    create(){
        this.propertyService.create()
    }
    @Put()
    update(){
        this.propertyService.update()
    }
}
