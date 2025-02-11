import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { propertyFeature } from "./propertyFeature.entity";
import { User } from "./user.entity";

@Entity() // entity decoration
export class Property{
    @PrimaryGeneratedColumn() // primary key auto generation decoration
    id: number

    @Column()
    name: String

    @Column()
    description: String

    @Column({ default:0 })
    price: number

    @OneToOne(()=>propertyFeature)
    propertyFeature: propertyFeature

    @ManyToOne(()=> User,(User) => User.properties)
    user: User

    @ManyToMany(()=>User, (user) => user.likedProperties)
    likedBy: User[];
}