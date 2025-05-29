import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("supply_management")
export class SupplyManagementEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    supplierName: string;

    @Column()
    contact: string;

    @Column()
    address: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: true }) 
    status: boolean;

    @Column({ nullable: true })
    deletedAt: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
