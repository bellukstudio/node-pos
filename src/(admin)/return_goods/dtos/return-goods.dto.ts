import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class ReturnGoodsDto {
    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly amount: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly reason: string

    @IsNotEmpty() @IsEnum(['to_customer', 'to_supplier'])
    readonly type: 'to_customer' | 'to_supplier'

    @IsNotEmpty() @IsDate()
    readonly return_date: Date
}