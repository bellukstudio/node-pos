import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CategoryProductEntity } from "./category-product.entity";
import { BranchEntity } from "../branch/branch.entity";

@Entity("products")
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    status: boolean;

    @Column()
    code: string;

    @Column()
    stock: number;

    @Column()
    unit: string;

    @Column()
    barcode: string;

    @Column()
    purchasePrice: number;

    @Column()
    salePrice: number;

    @ManyToOne(() => CategoryProductEntity)
    @JoinColumn({ name: 'categoryId' })
    category: CategoryProductEntity;

    @ManyToOne(() => BranchEntity, { nullable: true })
    @JoinColumn({ name: 'branchId' })
    branch: BranchEntity;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}