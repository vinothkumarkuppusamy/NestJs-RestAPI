import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private UserRepo: Repository<User>) {} //inject user repository
  
  async create(createUserDto: CreateUserDto) {
    const user = await this.UserRepo.create(createUserDto);
    return await this.UserRepo.save(user);
  }

  async findByEmail(email: string) {
    const user = await this.UserRepo.findOne({
      where: { email },
    });
    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
   return this.UserRepo.findOne({
    where: { id },
    select: ["firstName","email",  "role"]
   });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
