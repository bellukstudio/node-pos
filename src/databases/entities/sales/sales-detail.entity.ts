import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { SalesManagementEntity } from "./sales-management.entity";

@Entity("sales_details")
export class SalesDetailEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => SalesManagementEntity)
    @JoinColumn({ name: 'salesId' })
    sales: SalesManagementEntity

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'productId' })
    product: ProductEntity

    @Column()
    quantity: number

    @Column()
    unitPrice: number

    @Column()
    totalPrice: number

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}