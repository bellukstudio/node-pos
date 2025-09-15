import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ProductEntity } from "src/databases/entities/product/product.entity";
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity";

export class SalesDetailDto {
    @ApiProperty({
        description: "Sales Management entity yang berhubungan dengan detail transaksi",
        type: () => SalesManagementEntity
    })
    @IsNotEmpty()
    readonly sales: SalesManagementEntity;

    @ApiProperty({
        description: "Produk yang dibeli",
        type: () => ProductEntity
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({
        description: "Jumlah produk yang dibeli",
        example: 3
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly quantity: number;

    @ApiProperty({
        description: "Harga per unit produk",
        example: 150000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly unit_price: number;

    @ApiProperty({
        description: "Total harga produk (quantity * unit_price)",
        example: 450000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_price: number;
}
