import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("category_products")
export class CategoryProductEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name:string;

    @Column()
    description:string;

    @Column({nullable:true})
    deletedAt:Date;


    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}