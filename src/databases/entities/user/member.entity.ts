import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("members")
export class MemberEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column({unique: true, nullable: true})
    email: string;

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    address: string;

    @Column()
    loyaltyPoint: number;

    @Column({nullable: true})
    deletedAt: Date;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}