import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { createProductDto } from './dto/createProduct.dto';
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
    findAll(){}

    @Put()
    update(){}

    @Delete()
    Delete(){}
}
