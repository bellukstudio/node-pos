import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
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
            "audit",
            "branch",
            "category_product",
            "customer",
            "detail_purchase",
            "loyalty",
            "mutation_stock",
            "product",
            "promo",
            "purchase_product",
            "reports",
            "return_goods",
            "settings",
            "shift",
            "supplier",
            "transaction",
            "transaction_detail",
            "user"
        ],
    })
    module:
        "audit" |
        "branch" |
        "category_product" |
        "customer" |
        "detail_purchase" |
        "loyalty" |
        "mutation_stock" |
        "product" |
        "promo" |
        "purchase_product" |
        "reports" |
        "return_goods" |
        "settings" |
        "shift" |
        "supplier" |
        "transaction" |
        "transaction_detail" |
        "user";

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
    activity_time: Date;

    @Column({ nullable: true })
    ip_address: string;

    @Column({ nullable: true, type: 'text' })
    device_info: string;

    @DeleteDateColumn({ nullable: true })
    deleted_at?: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}
