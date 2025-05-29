import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";

@Entity("financial_statement")
export class FinancialStatementEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    dateReport: Date;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    totalIncome: number;

    @Column()
    totalExpenditure: number;

    @Column()
    netProfit: number;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date
}