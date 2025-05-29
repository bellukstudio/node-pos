import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { MemberEntity } from "../user/member.entity";


@Entity("point_loyalty")
export class PointsLoyaltyEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => MemberEntity)
    @JoinColumn({ name: 'member_id' })
    member: MemberEntity;

    @Column()
    points: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    deletedAt: Date;
}