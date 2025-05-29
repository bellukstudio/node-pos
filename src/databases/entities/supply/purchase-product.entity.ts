import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { SupplyManagementEntity } from "./supply-management.entity";
import { BranchEntity } from "../branch/branch.entity";

@Entity("purchase_product")
export class PurchaseProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => SupplyManagementEntity)
    @JoinColumn({ name: "supplier_id" })
    supplier: SupplyManagementEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: "branch_id" })
    branch: BranchEntity;

    @Column()
    totalPrice: number;

    @Column()
    purchaseDate: Date;

    @Column({ type: "enum", enum: ["finished", "pending"] })
    purchaseStatus: "finished" | "pending";

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
