import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { handleResponse } from "../helpers/statuscode.helper"
@Injectable()
export class ProductService {
  @InjectRepository(Product)
  private productRepos: Repository<Product>;
  async create(body: {}) {
    return await this.productRepos.save(body);
  }
  async findAll() {
    return await this.productRepos.find();
  }
  async update(id: number, body: {}) {
    return await this.productRepos.update(id, body);
  }
  async Delete(id: number) {
    return await this.productRepos.delete(id);
  }
}
