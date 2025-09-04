import { IsNotEmpty, IsNumber } from "class-validator"
import { ProductEntity } from "src/databases/entities/product/product.entity"
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity"


export class CreateTransactionDetailDto {
    @IsNotEmpty()
    readonly sales: SalesManagementEntity

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    @IsNumber()
    readonly quantity: number

    @IsNotEmpty()
    @IsNumber()
    readonly unitPrice: number

    @IsNotEmpty()
    @IsNumber()
    readonly totalPrice: number
}