import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/users.entity";
import { BranchEntity } from "../branch/branch.entity";

@Entity("sales_managements")
export class SalesManagementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    transaction_number: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'cashier_id' })
    user: UserEntity;


    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    total_price: number;

    @Column({ nullable: true })
    tax: number;


    @Column({ nullable: true })
    discount: number;

    @Column()
    total_payment: number;

    @Column()
    method_payment: string;

    @Column({ type: "enum", enum: ["finished", "pending", "canceled"] })
    status_payment: "finished" | "pending" | "canceled";

    @Column()
    transaction_time: string;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}