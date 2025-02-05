import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { property } from "./property.entity";

@Entity()
export class propertyFeature{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    area: number

    @Column()
    hasSwimmingPool: number

    @Column()
    rooms:number

    @OneToOne(() => property, 
    (property) => property.propertyFeature, // bidirectional entity relationship 
    { cascade : true }  // If we change id of propertyFeature automatically updates the property foreignkey also
)
    @JoinColumn()
    property: property
}