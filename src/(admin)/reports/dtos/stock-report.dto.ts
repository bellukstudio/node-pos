import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class StockReportDto {

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly initial_stock: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly stock_sold: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly stock_in: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly remaining_stock: number
}