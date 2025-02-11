import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class User{
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

    @OneToMany(()=> Property, 
    (property) => property.user) // one user can have many properties
    properties: Property[]

    @ManyToMany(()=> Property,(property)=> property.likedBy)
    @JoinTable({name: "user_liked_properties"}) // own table have a manyTomany child table  
     likedProperties: Property[]
    
}