import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],   // If you using TypeORM check the forReature entity module added or not
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
