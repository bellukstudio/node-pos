import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { PurchaseProductEntity } from "../../../databases/entities/supply/purchase-product.entity";
import { ProductEntity } from "../../../databases/entities/product/product.entity";

export class DetailPurchaseDto {
    @ApiProperty({
        description: "Referensi ke entitas PurchaseProduct",
        type: () => PurchaseProductEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" },
    })
    @IsNotEmpty()
    readonly purchase: PurchaseProductEntity;

    @ApiProperty({
        description: "Referensi ke entitas Product",
        type: () => ProductEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174001" },
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({
        description: "Jumlah produk yang dibeli",
        example: 10,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly amount: number;

    @ApiProperty({
        description: "Harga satuan produk",
        example: 15000,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly unit_price: number;

    @ApiProperty({
        description: "Total harga untuk jumlah produk ini",
        example: 150000,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly sub_total: number;
}
