import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { CategoryProductEntity } from "src/databases/entities/product/category-product.entity";

export class ProductDto {

    @IsNotEmpty() @IsString()
    readonly name: string;

    @IsNotEmpty() @IsString()
    readonly description: string;

    @IsNotEmpty() @IsBoolean()
    readonly status: boolean

    @IsNotEmpty() @IsString()
    readonly code: string

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly stock: number

    @IsNotEmpty() @IsString()
    readonly unit: string

    @IsNotEmpty() @IsString()
    readonly barcode: string

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly purchase_price: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly sale_price: number

    @IsNotEmpty()
    readonly category: CategoryProductEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

}