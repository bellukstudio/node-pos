import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber } from "class-validator"
import { ProductEntity } from "src/databases/entities/product/product.entity"
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity"


export class TransactionDetailDto {
    @IsNotEmpty()
    readonly sales: SalesManagementEntity

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly quantity: number

    @IsNotEmpty()
    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly unit_price: number

    @IsNotEmpty()
    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly total_price: number
}