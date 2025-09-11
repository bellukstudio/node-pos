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
    total_price: number;

    @Column()
    purchase_date: Date;

    @Column({ type: "enum", enum: ["finished", "pending"] })
    purchase_status: "finished" | "pending";

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
