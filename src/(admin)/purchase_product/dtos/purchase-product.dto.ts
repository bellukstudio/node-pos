import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { SupplyManagementEntity } from "../../../databases/entities/supply/supply-management.entity";
import { BranchEntity } from "../../../databases/entities/branch/branch.entity";

export class PurchaseProductDto {
    @ApiProperty({
        description: "Supplier yang menyediakan produk",
        type: () => SupplyManagementEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly supplier: SupplyManagementEntity;

    @ApiProperty({
        description: "Cabang tempat pembelian produk dilakukan",
        type: () => BranchEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174001" }
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
        description: "Tanggal pembelian dalam format ISO 8601",
        example: "2025-01-01T00:00:00.000Z",
        type: String,
        format: "date-time"
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly purchase_date: Date;

    @ApiProperty({
        description: "Status pembelian",
        example: "pending",
        enum: ["finished", "pending"]
    })
    @IsNotEmpty()
    @IsEnum(["finished", "pending"])
    readonly purchase_status: "finished" | "pending";
}
