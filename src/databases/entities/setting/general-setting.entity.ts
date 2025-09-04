import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity("general_settings")
export class GeneralSettingEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    storeName: string;

    @Column()
    address: string;

    @Column()
    phoneNumber: string;

    @Column()
    email: string;

    @Column()
    logo: string;

    @Column()
    tax: number;

    @Column()
    globalDiscount: number;
    
    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}