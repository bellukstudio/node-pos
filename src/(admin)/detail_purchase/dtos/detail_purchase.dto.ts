import { IsNotEmpty, IsNumber } from "class-validator";
import { ProductEntity } from "src/databases/entities/product/product.entity";
import { PurchaseProductEntity } from "src/databases/entities/supply/purchase-product.entity";

export class DetailPurchaseDto{
    @IsNotEmpty() 
    readonly purchase: PurchaseProductEntity

    @IsNotEmpty() 
    readonly product: ProductEntity

    @IsNotEmpty() @IsNumber()
    readonly amount: number

    @IsNotEmpty() @IsNumber()
    readonly unit_price: number

    @IsNotEmpty() @IsNumber()
    readonly sub_total: number
}