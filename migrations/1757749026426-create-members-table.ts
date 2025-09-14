import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMembersTable1757749026426 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "members",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "customer_id",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "loyalty_point",
                        type: "integer",
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
                        default: null,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("member_entity");
    }
}
