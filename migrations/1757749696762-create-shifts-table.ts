import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateShiftsTable1757749696762 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "shifts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "cashier_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "time_in",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "time_out",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "total_sales",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "total_transactions",
                        type: "int",
                        default: 0,
                    },
                    {
                        name: "opening_cash",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        default: 0,
                    },
                    {
                        name: "closing_cash",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: true,
                    },
                    {
                        name: "shift_note",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "shift_status",
                        type: "enum",
                        enum: ["active", "closed", "cancelled"],
                        default: "'active'",
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
            "shifts",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "shifts",
            new TableForeignKey({
                columnNames: ["cashier_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("shifts");
    }
}
