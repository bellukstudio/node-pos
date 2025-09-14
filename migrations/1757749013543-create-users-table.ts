import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable1757749013543 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "users",
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
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "role",
                        type: "varchar", // bisa diganti enum kalau role kamu pakai enum di database
                        isNullable: false,
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "branchId",
                        type: "uuid",
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

        await queryRunner.createForeignKey(
            "users",
            new TableForeignKey({
                columnNames: ["branchId"],
                referencedTableName: "branch",
                referencedColumnNames: ["id"],
                onDelete: "SET NULL",
                onUpdate: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("users");
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.indexOf("branchId") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("users", foreignKey);
        }

        await queryRunner.dropTable("users");
    }

}
