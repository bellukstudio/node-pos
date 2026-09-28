import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { SalesManagementEntity } from "../../../databases/entities/sales/sales-management.entity";
import { ProductEntity } from "../../../databases/entities/product/product.entity";

export class SalesDetailDto {
    @ApiProperty({
        description: "Sales Management entity yang berhubungan dengan detail transaksi",
        type: () => SalesManagementEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly sales: SalesManagementEntity;

    @ApiProperty({
        description: "Produk yang dibeli",
        type: () => ProductEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174001" }
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
