import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { createProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';
import { UpdateProductDto } from './dto/updateProuct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService ){}
    @Post("create")
    @UsePipes(new ValidationPipe())
    create(@Body() body : createProductDto){
        return this.productService.create(body);
    }

    @Get()
    findAll(){}

    @Put()
    update(@Param("id") id:string, @Body() body:UpdateProductDto){}

    @Delete()
    Delete(){}
}
