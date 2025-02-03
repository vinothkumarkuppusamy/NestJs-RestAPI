import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { createProductDto, updateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';


@Controller('product')
export class ProductController {
    constructor(private productService: ProductService ){}
    @Post("create")
    @UsePipes(new ValidationPipe())
    create(@Body() body : createProductDto){
        return this.productService.create(body);
    }

    @Get()
    findAll(@Query() id: number){
        return this.productService.findAll(id);
    }

    @Put()
    update(@Param("id") id:string, @Body() body:updateProductDto){}

    @Delete()
    Delete(){}
}
