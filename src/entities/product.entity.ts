import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('products') 
export class Product {
  @PrimaryGeneratedColumn()
  id: number; 
  @Column({ type: 'varchar', length: 255 }) 
  productName: string; 

  @Column({ type: 'text', nullable: true }) 
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 }) 
  price: number;
}