import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLogShiftsTable1757749704163 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "shift_activity_logs",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "shift_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "activity_type",
                        type: "enum",
                        enum: ["sale", "return", "stock_transfer", "transaction_cancel", "other"],
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: false,
                    },
                    {
                        name: "activity_time",
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
            "shift_activity_logs",
            new TableForeignKey({
                columnNames: ["shift_id"],
                referencedTableName: "shifts",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("shift_activity_logs");
    }
}
