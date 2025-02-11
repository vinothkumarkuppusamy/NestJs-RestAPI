import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { createProductDto, updateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() body: createProductDto) {
    return this.productService.create(body);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Put()
  update(@Param('id') id: number, @Body() body: updateProductDto) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  Delete(@Param('id') id: number) {
    return this.productService.Delete(id);
  }
}
