import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateStockReportsTable1757749513291 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "stock_reports",
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
                        name: "initial_stock",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "stock_sold",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "stock_in",
                        type: "int",
                        isNullable: false,
                        default: 0,
                    },
                    {
                        name: "remaining_stock",
                        type: "int",
                        isNullable: false,
                        default: 0,
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
            "stock_reports",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "stock_reports",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("stock_reports");
    }
}
