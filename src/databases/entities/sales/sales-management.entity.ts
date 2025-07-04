import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/users.entity";
import { BranchEntity } from "../branch/branch.entity";

@Entity("sales_managements")
export class SalesManagementEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    transactionNumber: string

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'cashier_id' })
    user: UserEntity;


    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    totalPrice: number;

    @Column({ nullable: true })
    tax: number;


    @Column({ nullable: true })
    discount: number;

    @Column()
    totalPayment: number;

    @Column()
    methodPayment: string;

    @Column({ type: "enum", enum: ["finished", "pending", "canceled"] })
    statusPayment: "finished" | "pending" | "canceled";

    @Column()
    transactionTime: string;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}