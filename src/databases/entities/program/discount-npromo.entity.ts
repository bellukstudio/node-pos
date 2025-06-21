import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";
import { ProductEntity } from "../product/product.entity";


@Entity("discount_npromo")
export class DiscountNpromoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    promoName: string;

    @Column({ type: "enum", enum: ["presentase", "nominal"] })
    typePromo: "presentase" | "nominal";

    @Column({})
    promoValue: string;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @Column()
    expired: Date;

    @Column()
    status: boolean;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}