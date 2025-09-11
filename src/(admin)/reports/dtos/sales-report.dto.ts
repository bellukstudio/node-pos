import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

export class SalesReportDto {
    
    @IsNotEmpty() @IsDate()
    readonly date_report: Date

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @IsNumber()
    readonly total_sales: number

    @IsNotEmpty() @IsNumber()
    readonly total_income: number

    @IsNotEmpty() @IsNumber()
    readonly total_discount: number

    @IsNotEmpty() @IsNumber()
    readonly total_tax: number

    @IsNotEmpty() @IsNumber()
    readonly total_profit: number
}