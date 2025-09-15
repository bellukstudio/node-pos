import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BranchEntity } from "../branch/branch.entity";


@Entity("sales_report")
export class SalesReportEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date_report: Date;

  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @Column()
  total_sales: number;

  @Column()
  total_income: number;

  @Column()
  total_discount: number;

  @Column()
  total_tax: number;

  @Column()
  total_profit: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

}