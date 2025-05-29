import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";


@Entity("sales_report")
export class SalesReportEntity {
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column()
    dateReport:Date;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column()
    totalSales: number;

    @Column()
    totalIncome: number;

    @Column()
    totalDiscount: number;

    @Column()
    totalTax: number;

    @Column()
    totalProfit: number;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}