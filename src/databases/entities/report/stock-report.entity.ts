import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { BranchEntity } from "../branch/branch.entity";


@Entity("stock_reports")
export class StockReportEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    initialStock: number;

    @Column()
    stockSold: number;

    @Column()
    stockIn: number;

    @Column()
    remainingStock: number;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;


}