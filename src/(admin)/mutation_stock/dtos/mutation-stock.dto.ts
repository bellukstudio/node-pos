import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class MutationStockDto{
    @IsNotEmpty()
    readonly product: ProductEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @IsEnum(["in", "out", "damaged", "return"])
    readonly type: "in" | "out" | "damaged" | "return"

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly amount: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly remaining_stock: number

    @IsNotEmpty() @IsDate()
    readonly mutation_date: Date
}