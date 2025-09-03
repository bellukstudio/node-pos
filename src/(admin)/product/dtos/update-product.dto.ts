import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { CategoryProductEntity } from "src/databases/entities/product/category-product.entity";

export class UpdateProductDto {

    @IsNotEmpty()  @IsString()
    readonly name: string;

    @IsNotEmpty()  @IsString()
    readonly description: string;

    @IsNotEmpty() @IsBoolean()
    readonly status: boolean

    @IsNotEmpty() @IsString()
    readonly code: string

    @IsNotEmpty() @IsNumber()
    readonly stock: number

    @IsNotEmpty() @IsString()
    readonly unit: string

    @IsNotEmpty() @IsString()
    readonly barcode: string

    @IsNotEmpty() @IsNumber()
    readonly purchasePrice: number

    @IsNotEmpty() @IsNumber()
    readonly salePrice: number

    @IsNotEmpty()
    readonly category: CategoryProductEntity

    @IsNotEmpty()
    readonly branch : BranchEntity

}