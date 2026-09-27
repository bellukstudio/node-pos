import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { Role } from '../../../core/enum/role.enum';
@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column()
  role: Role;

  @Column()
  status: string;

  @Column({ default: 0, select: false })
  token_version: number;

  @ManyToOne(() => BranchEntity)
  @JoinColumn({ name: 'branch_id' })
  branch: BranchEntity;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

}