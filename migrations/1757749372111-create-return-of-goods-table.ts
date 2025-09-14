import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateReturnOfGoodsTable1757749372111 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "return_of_goods",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "amount",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "reason",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["to_customer", "to_supplier"],
                        isNullable: false,
                    },
                    {
                        name: "return_date",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "deleted_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                ],
            }),
            true
        );

        await queryRunner.createForeignKey(
            "return_of_goods",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "return_of_goods",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("return_of_goods");
    }
}
