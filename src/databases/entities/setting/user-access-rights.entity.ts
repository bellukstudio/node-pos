import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../user/users.entity";
import { BranchEntity } from "../branch/branch.entity";


@Entity("user_access_rights")
export class UserAccessRightsEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;

    @ManyToOne(() => BranchEntity)
    @JoinColumn({ name: 'branch_id' })
    branch: BranchEntity;

    @Column({
        type: "enum",
        enum: [
            "product",
            "report",
            "customer",
            "audit",
            "branch",
            "program",
            "sales",
            "setting",
            "shift",
            "supply",
            "stock",
            "user"
        ],
        array: true,
    })
    modules: (
        | "product"
        | "report"
        | "customer"
        | "audit"
        | "branch"
        | "program"
        | "sales"
        | "setting"
        | "shift"
        | "supply"
        | "stock"
        | "user"
    )[];


    @Column({ type: "enum", enum: ["read", "write", "delete", "edit"] })
    action: "read" | "write" | "edit" | "delete";

    @Column({ nullable: true })
    deleted_at: Date

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn({ nullable: true })
    updated_at: Date;
}