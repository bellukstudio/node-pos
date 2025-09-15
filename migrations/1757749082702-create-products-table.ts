import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateProductsTable1757749082702 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        await queryRunner.createTable(
            new Table({
                name: "products",
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
                        name: "description",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "image",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "status",
                        type: "boolean",
                        isNullable: false,
                    },
                    {
                        name: "code",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "stock",
                        type: "integer",
                        isNullable: false,
                    },
                    {
                        name: "unit",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "barcode",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "purchase_price",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "sale_price",
                        type: "decimal",
                        precision: 12,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: false,
                    },
                    {
                        name: "branch_id",
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
            "products",
            new TableForeignKey({
                columnNames: ["category_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "category_products",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "products",
            new TableForeignKey({
                columnNames: ["branch_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "branchs",
                onDelete: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("products");
        if (table) {
            const categoryFk = table.foreignKeys.find(fk => fk.columnNames.includes("category_id"));
            const branchFk = table.foreignKeys.find(fk => fk.columnNames.includes("branch_id"));
            if (categoryFk) await queryRunner.dropForeignKey("products", categoryFk);
            if (branchFk) await queryRunner.dropForeignKey("products", branchFk);
        }
        await queryRunner.dropTable("products");
    }
}
