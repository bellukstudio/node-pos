import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBranchsTable1757749066828 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "branchs",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "city",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "province",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: false,
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
                        default: null,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("branchs");
    }
}
