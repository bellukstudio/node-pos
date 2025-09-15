import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

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
            }),
            true
        );
        await queryRunner.createForeignKey(
            "discount_npromo",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedTableName: "branchs",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "discount_npromo",
            new TableForeignKey({
                columnNames: ["product_id"],
                referencedTableName: "products",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("discount_npromo");
    }
}
