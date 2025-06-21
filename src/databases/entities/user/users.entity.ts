import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { Role } from 'src/core/enum/role.enum';
@Entity("users")
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: Role;

    @Column()
    status: string;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branchId' })
    branch: BranchEntity;

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}