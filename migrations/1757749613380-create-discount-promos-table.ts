import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateDiscountPromosTable1757749613380 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "discount_npromo",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: "uuid_generate_v4()",
                    },
                    {
                        name: "promo_name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "type_promo",
                        type: "enum",
                        enum: ["percentage", "fixed", "free", "buy", "special"],
                        isNullable: false,
                    },
                    {
                        name: "promo_value",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "branch_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "product_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "expired",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "boolean",
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
                foreignKeys: [
                    {
                        columnNames: ["branch_id"],
                        referencedTableName: "branch",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["product_id"],
                        referencedTableName: "product",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("discount_npromo");
    }
}
