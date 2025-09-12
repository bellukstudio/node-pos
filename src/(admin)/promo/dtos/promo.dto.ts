import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class PromoDto {
    @IsNotEmpty() @IsString()
    readonly promo_name: string;

    @IsNotEmpty() @IsEnum(["percentage", "fixed", "free", "buy", "special"])
    readonly type_promo: "percentage" | "fixed" | "free" | "buy" | "special";

    @IsNotEmpty() @IsString()
    readonly promo_value: string;

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty()
    readonly product: ProductEntity

    @IsOptional() @IsDate()
    readonly expired: Date

    @IsNotEmpty() @IsBoolean()
    readonly status: boolean
    
}