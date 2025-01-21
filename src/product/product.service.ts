import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
    @InjectRepository(Product)
    private productRepos: Repository<Product>
  async create(body: {}) {
    return this.productRepos.save(body);
  }

  async findAll() {}

  async update() {}

  async Delete() {}
}
