import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { SalesManagementEntity } from "./sales-management.entity";

@Entity("sales_details")
export class SalesDetailEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => SalesManagementEntity)
  @JoinColumn({ name: 'sales_id' })
  sales: SalesManagementEntity

  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity

  @Column()
  quantity: number

  @Column()
  unit_price: number

  @Column()
  total_price: number

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}