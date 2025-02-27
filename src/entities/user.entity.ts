import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Property } from './property.entity';
import * as bcrypt from "bcrypt";
import { IsOptional } from 'class-validator';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ default: 'user' })
  role: string
  
  @Column()
  password: string;
 
  @Column({nullable:true})
  hashRefreshToken: string;

  @Column({nullable : true}) // Nullable is validate nullable value also
  avatarUrl: string;
    
  @CreateDateColumn() // create automatically current date in entity.
  createdAt: Date;

  @OneToMany(() => Property, (property) => property.user) // one user can have many properties
  properties: Property[];

  @ManyToMany(() => Property, (property) => property.likedBy)
  @JoinTable({ name: 'user_liked_properties' }) // own table have a manyTomany child table
  likedProperties: Property[];

  @BeforeInsert() 
  async hashPassword(){
    this.password = await bcrypt.hash(this.password, 10); // hashing the password..
  }
  // async comparePassword(){
  //   return await bcrypt.compare(this.password, this.password);
  // }
}
