import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}