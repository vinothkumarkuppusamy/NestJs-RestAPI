import { Body, Controller, Delete, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { productService } from './product.service';
import { createProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
    constructor(private productService: productService){}
    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto: createProductDto){}

    @Get()
    findAll(){}

    @Put()
    update(){}

    @Delete()
    Delete(){}
}
