import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "../../../databases/entities/branch/branch.entity";

export class SalesReportDto {
    @ApiProperty({
        description: "Tanggal laporan penjualan",
        example: "2025-09-12T00:00:00.000Z",
        type: String,
        format: "date-time"
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly date_report: Date;

    @ApiProperty({
        description: "Cabang yang membuat laporan",
        type: () => BranchEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Total jumlah transaksi penjualan",
        example: 120,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_sales: number;

    @ApiProperty({
        description: "Total pendapatan dari penjualan",
        example: 25000000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_income: number;

    @ApiProperty({
        description: "Total diskon yang diberikan",
        example: 500000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_discount: number;

    @ApiProperty({
        description: "Total pajak yang dikenakan",
        example: 250000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_tax: number;

    @ApiProperty({
        description: "Total keuntungan bersih setelah diskon dan pajak",
        example: 20000000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_profit: number;
}
