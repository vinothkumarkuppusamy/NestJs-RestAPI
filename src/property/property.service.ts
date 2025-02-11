import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { Repository } from 'typeorm';
import { createPropertydto } from './dto/createProperty.dto';
import { handleResponse } from 'src/helpers/statuscode.helper';
@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) 
     private propertyRepos: Repository<Property>,
  ) {}
  async findOne(id: number) {
    const property =  await this.propertyRepos.findOne({
      where: {
        id
      }
    });
    if(!property) throw new NotFoundException(handleResponse(false, "property not found","")); // if property not exception throw error
    return handleResponse(true, "property retrieved...",property)
  }
  async findAll() {
   
  }
  async create(dto: createPropertydto) {
    return await this.propertyRepos.save(dto)
  }

  async update(id: number) {}
}
