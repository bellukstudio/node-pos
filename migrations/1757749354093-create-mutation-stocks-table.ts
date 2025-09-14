import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMutationStocksTable1757749354093 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "mutation_stock",
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
                        name: "type",
                        type: "enum",
                        enum: ["in", "out", "damaged", "return"],
                        isNullable: false,
                    },
                    {
                        name: "amount",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "remaining_stock",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "mutation_date",
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
            "mutation_stock",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "mutation_stock",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mutation_stock");
    }
}
