import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { createPropertydto } from './dto/createProperty.dto';
import { paginationDTO } from './dto/pagination.dto';
// interface Service{
//     findAll()
//     create()
//     update()
// }
@Controller('property')
export class PropertyController {
    constructor(private propertyService: PropertyService){}
    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id){
        return this.propertyService.findOne(id);
    }
    @Get()
    findAll(@Query() paginationDTO: paginationDTO){
       return this.propertyService.findAll(paginationDTO)
    }
    @Post()
    @UsePipes(new ValidationPipe())
    create( @Body() dto:createPropertydto){
        return this.propertyService.create(dto)
    }
    @Put(":id")
    update(@Param("id", ParseIntPipe) id, @Body() dto: createPropertydto) {
        return this.propertyService.update(id, dto);
    }
}
