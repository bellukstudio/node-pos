import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ShiftEntity } from './shift.entity';

@Entity('shift_activity_logs')
export class ShiftActivityLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => ShiftEntity)
    @JoinColumn({ name: 'shift_id' })
    shift: ShiftEntity;

    @Column({
        type: 'enum',
        enum: ['sale', 'return', 'stock_transfer', 'transaction_cancel', 'other'],
    })
    activityType: 'sale' | 'return' | 'stock_transfer' | 'transaction_cancel' | 'other';

    @Column({ type: 'text' })
    description: string;

    @Column()
    activityTime: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
