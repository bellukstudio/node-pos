import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enum/role.enum';
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

    @Column({ nullable: true })
    deletedAt: Date

    @Column({ nullable: true })
    createdAt: Date

    @Column({ nullable: true })
    updatedAt: Date

}