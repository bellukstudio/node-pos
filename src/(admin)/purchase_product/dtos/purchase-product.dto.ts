import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { SupplyManagementEntity } from "src/databases/entities/supply/supply-management.entity";

export class PurchaseProductDto {
    @ApiProperty({
        description: "Supplier yang menyediakan produk",
        type: () => SupplyManagementEntity
    })
    @IsNotEmpty()
    readonly supplier: SupplyManagementEntity;

    @ApiProperty({
        description: "Cabang tempat pembelian produk dilakukan",
        type: () => BranchEntity
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Total harga pembelian",
        example: 1500000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_price: number;

    @ApiProperty({
        description: "Tanggal pembelian dalam bentuk timestamp (epoch milliseconds)",
        example: 1735689600000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly purchase_date: number;

    @ApiProperty({
        description: "Status pembelian",
        example: "pending",
        enum: ["finished", "pending"]
    })
    @IsNotEmpty()
    @IsEnum(["finished", "pending"])
    readonly purchase_status: "finished" | "pending";
}
