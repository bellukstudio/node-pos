import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGeneralSettingsTbale1757749564276 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "general_settings",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "store_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "address",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "logo",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "tax",
                        type: "numeric",
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: "global_discount",
                        type: "numeric",
                        default: 0,
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("general_settings");
    }
}
