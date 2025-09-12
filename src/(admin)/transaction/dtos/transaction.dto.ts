import { Type } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { BranchEntity } from "src/databases/entities/branch/branch.entity"
import { UserEntity } from "src/databases/entities/user/users.entity"


export class TransactionDto {

    @IsNotEmpty() @IsString()
    readonly transaction_number: string

    @IsNotEmpty()
    readonly user: UserEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly total_price: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly tax: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly discount: number

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly total_payment: number

    @IsNotEmpty() @IsString()
    readonly method_payment: string

    @IsNotEmpty()
    readonly status_payment: "finished" | "pending" | "canceled"

    @IsNotEmpty()
    readonly transaction_time: string
}