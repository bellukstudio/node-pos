import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";

@Entity("financial_statement")
export class FinancialStatementEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    date_report: Date;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    total_income: number;

    @Column()
    total_expenditure: number;

    @Column()
    net_profit: number;
    
    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}