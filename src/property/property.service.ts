import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from '../entities/property.entity';
import { Repository } from 'typeorm';
import { createPropertydto } from './dto/createProperty.dto';
import { handleResponse } from '../helpers/statuscode.helper';
import { paginationDTO } from './dto/pagination.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';
@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepos: Repository<Property>,
  ) {}
  async findOne(id: number) {
    const property = await this.propertyRepos.findOne({
      where: {
        id,
      },
    });
    if (!property)
      throw new NotFoundException(
        handleResponse(false, 'property not found',),
      ); // if property not exception throw error
    return handleResponse(true, 'property retrieved...', property);
  }
  async findAll(paginationDTO: paginationDTO) {
    return await this.propertyRepos.find({
      skip: paginationDTO.skip,
      take: paginationDTO.limit || DEFAULT_PAGE_SIZE,
    });
  }
  async create(dto: createPropertydto) {
    return await this.propertyRepos.save(dto);
  }

  async update(id: number, dto: createPropertydto) {
    return await this.propertyRepos.update({ id }, dto);
  }
}
