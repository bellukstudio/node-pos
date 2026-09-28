import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from '../../../databases/entities/branch/branch.entity';

export class FinancialStatementDto {
    @ApiProperty({
        description: "Tanggal laporan keuangan",
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
        description: "Total pemasukan (income) dalam laporan",
        example: 15000000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_income: number;

    @ApiProperty({
        description: "Total pengeluaran (expenditure) dalam laporan",
        example: 7500000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_expenditure: number;

    @ApiProperty({
        description: "Laba bersih (net profit) yang dihasilkan",
        example: 7500000,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly net_profit: number;
}
