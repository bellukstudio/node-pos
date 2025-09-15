import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePointLoyaltiesTable1757749630567 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "point_loyalty",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "member_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "points",
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
            "point_loyalty",
            new TableForeignKey({
                columnNames: ["member_id"],
                referencedTableName: "members",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("point_loyalty");
    }
}
