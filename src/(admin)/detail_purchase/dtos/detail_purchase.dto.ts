import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { ProductEntity } from "src/databases/entities/product/product.entity";
import { PurchaseProductEntity } from "src/databases/entities/supply/purchase-product.entity";

export class DetailPurchaseDto {
    @IsNotEmpty()
    readonly purchase: PurchaseProductEntity

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly amount: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly unit_price: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly sub_total: number
}