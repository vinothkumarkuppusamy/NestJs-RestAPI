import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { propertyFeature } from "./propertyFeature.entity";
import { user } from "./user.entity";

@Entity() // entity decoration
export class property{
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

    @ManyToOne(()=> user,
(user) => user.properties // 
)
    user: user
}