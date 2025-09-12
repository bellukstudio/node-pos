import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

export class FinancialStatementDto {

    @IsNotEmpty() @IsDate()
    readonly date_report: Date

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly total_income: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly total_expenditure: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly net_profit: number
}