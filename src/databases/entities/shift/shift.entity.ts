import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { BranchEntity } from '../branch/branch.entity';
import { UserEntity } from '../user/users.entity';

@Entity('shifts')
export class ShiftEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'cashier_id' })
    cashier: UserEntity;

    @Column()
    time_in: Date;

    @Column({ nullable: true })
    time_out: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    total_sales: number;

    @Column({ default: 0 })
    total_transactions: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    opening_cash: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    closing_cash: number;

    @Column({ type: 'text', nullable: true })
    shift_note: string;

    @Column({
        type: 'enum',
        enum: ['active', 'closed', 'cancelled'],
        default: 'active',
    })
    shift_status: 'active' | 'closed' | 'cancelled';

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
