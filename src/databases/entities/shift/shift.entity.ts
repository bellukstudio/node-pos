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
    timeIn: Date;

    @Column({ nullable: true })
    timeOut: Date;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    totalSales: number;

    @Column({ default: 0 })
    totalTransactions: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
    openingCash: number;

    @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
    closingCash: number;

    @Column({ type: 'text', nullable: true })
    shiftNote: string;

    @Column({
        type: 'enum',
        enum: ['active', 'closed', 'cancelled'],
        default: 'active',
    })
    shiftStatus: 'active' | 'closed' | 'cancelled';

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
