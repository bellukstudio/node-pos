import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

export class FinancialStatementDto {
    
    @IsNotEmpty() @IsDate()
    readonly date_report: Date

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @IsNumber()
    readonly total_income: number
    
    @IsNotEmpty() @IsNumber()
    readonly total_expenditure: number

    @IsNotEmpty() @IsNumber()
    readonly net_profit: number
}