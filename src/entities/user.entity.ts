import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { property } from "./property.entity";

@Entity()
export class user{
    @PrimaryGeneratedColumn() 
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    email: string

    @Column()
    avatarUrl: string

    @CreateDateColumn() // create automatically current date in entity.
    createdAt: Date

    @OneToMany(()=> property, 
    (property) => property.user) // one user can have many properties
    properties: property[]
    
}