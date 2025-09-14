import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSalesManagementTable1757749152510 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "sales_managements",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "transaction_number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cashier_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "total_price",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "tax",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: "discount",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: "total_payment",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "method_payment",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status_payment",
                        type: "enum",
                        enum: ["finished", "pending", "canceled"],
                        isNullable: false,
                    },
                    {
                        name: "transaction_time",
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
            "sales_managements",
            new TableForeignKey({
                columnNames: ["cashier_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "sales_managements",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales_managements");
    }
}
