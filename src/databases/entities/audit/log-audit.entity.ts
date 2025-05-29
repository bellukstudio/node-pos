import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../user/users.entity';
import { BranchEntity } from '../branch/branch.entity';

@Entity('audit_logs')
export class AuditLogEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column({
        type: 'enum',
        enum: [
            'product',
            'sale',
            'customer',
            'report',
            'setting',
            'purchase',
            'shift',
            'stock',
            'user',
            'supplier',
            'program',
        ],
    })
    module:
        | 'product'
        | 'sale'
        | 'customer'
        | 'report'
        | 'setting'
        | 'purchase'
        | 'shift'
        | 'stock'
        | 'user'
        | 'supplier'
        | 'program';

    @Column({
        type: 'enum',
        enum: [
            'create',
            'update',
            'delete',
            'login',
            'logout',
            'print_receipt',
        ],
    })
    action:
        | 'create'
        | 'update'
        | 'delete'
        | 'login'
        | 'logout'
        | 'print_receipt';

    @Column({ type: 'text' })
    description: string;

    @Column()
    activityTime: Date;

    @Column({ nullable: true })
    ipAddress: string;

    @Column({ nullable: true, type: 'text' })
    deviceInfo: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
