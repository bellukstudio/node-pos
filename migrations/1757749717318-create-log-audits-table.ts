import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateLogAuditsTable1757749717318 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
            new Table({
                name: "audit_logs",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "module",
                        type: "enum",
                        enum: [
                            "product",
                            "sale",
                            "customer",
                            "report",
                            "setting",
                            "purchase",
                            "shift",
                            "stock",
                            "user",
                            "supplier",
                            "program",
                        ],
                    },
                    {
                        name: "action",
                        type: "enum",
                        enum: ["create", "update", "delete", "login", "logout", "print_receipt"],
                    },
                    {
                        name: "description",
                        type: "text",
                    },
                    {
                        name: "activity_time",
                        type: "timestamp",
                    },
                    {
                        name: "ip_address",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "device_info",
                        type: "text",
                        isNullable: true,
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
            "audit_logs",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "NULL",
            })
        );

        await queryRunner.createForeignKey(
            "audit_logs",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("audit_logs");
    }
}
