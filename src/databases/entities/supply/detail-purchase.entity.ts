import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PurchaseProductEntity } from "./purchase-product.entity";
import { ProductEntity } from "../product/product.entity"; // pastikan path benar

@Entity("detail_purchase")
export class DetailPurchaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => PurchaseProductEntity)
    @JoinColumn({ name: "purchase_id" })
    purchase: PurchaseProductEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: "product_id" })
    product: ProductEntity;

    @Column()
    amount: number;

    @Column()
    unitPrice: number;

    @Column()
    subTotal: number;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
