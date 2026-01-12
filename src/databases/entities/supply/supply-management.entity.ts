import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

@Entity("supply_management")
export class SupplyManagementEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  supplier_name: string;

  @Column()
  contact: string;

  @Column()
  address: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  status: boolean;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
