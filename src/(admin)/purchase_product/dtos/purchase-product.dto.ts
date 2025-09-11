import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { SupplyManagementEntity } from "src/databases/entities/supply/supply-management.entity";

export class PurchaseProductDto {
    @IsNotEmpty()
    readonly supplier: SupplyManagementEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @IsNumber()
    readonly total_price: number

    @IsNotEmpty() @IsNumber()
    readonly purchase_date: number

    @IsNotEmpty() @IsEnum(["finished", "pending"])
    readonly purchase_status: "finished" | "pending"

}