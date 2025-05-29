import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ProductEntity } from "../product/product.entity";
import { BranchEntity } from "../branch/branch.entity";


@Entity("return_of_goods")
export class ReturnOfGoodsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'product_id' })
    product: ProductEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    amount: number;

    @Column()
    reason: string;

    @Column({type: "enum", enum : ["to_customer", "to_supplier"]})
    type: "to_customer" | "to_supplier";

    @Column()
    returnDate: Date;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}