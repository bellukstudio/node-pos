import { IsNotEmpty, IsNumber } from "class-validator"
import { ProductEntity } from "src/databases/entities/product/product.entity"
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity"


export class TransactionDetailDto {
    @IsNotEmpty()
    readonly sales: SalesManagementEntity

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number

    @IsNotEmpty()
    @IsNumber()
    readonly unit_price: number

    @IsNotEmpty()
    @IsNumber()
    readonly total_price: number
}