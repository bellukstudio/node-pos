import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";
import { ProductEntity } from "../product/product.entity";


@Entity("discount_npromo")
export class DiscountNpromoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    promo_name: string;

    @Column({ type: "enum", enum: ["percentage", "fixed", "free", "buy", "special"] })
    type_promo: "percentage" | "fixed" | "free" | "buy" | "special";

    @Column({})
    promo_value: string;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column({ nullable: true })
    expired: Date;

    @Column()
    status: boolean;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}