import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { BranchEntity } from "../branch/branch.entity";


@Entity('mutation_stock')
export class MutationStockEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column({ type: "enum", enum: ["in", "out", "damaged", "return"] })
    type: "in" | "out" | "damaged" | "return";

    @Column()
    amount: number;

    @Column()
    remainingStock: number;

    @Column()
    mutationDate: Date;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}