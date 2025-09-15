import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("general_settings")
export class GeneralSettingEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  store_name: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  email: string;

  @Column()
  logo: string;

  @Column()
  tax: number;

  @Column()
  global_discount: number;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}