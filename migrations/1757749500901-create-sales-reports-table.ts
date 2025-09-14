import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateSalesReportsTable1757749500901 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "sales_report",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "date_report",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "total_sales",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "total_income",
                        type: "decimal",
                        precision: 15,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "total_discount",
                        type: "decimal",
                        precision: 15,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "total_tax",
                        type: "decimal",
                        precision: 15,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "total_profit",
                        type: "decimal",
                        precision: 15,
                        scale: 2,
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
            "sales_report",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("sales_report");
    }
}
