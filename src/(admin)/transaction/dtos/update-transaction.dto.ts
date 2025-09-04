import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { BranchEntity } from "src/databases/entities/branch/branch.entity"
import { UserEntity } from "src/databases/entities/user/users.entity"


export class UpdateTransactionDto {

    @IsNotEmpty() @IsString()
    readonly transactionNumber: string

    @IsNotEmpty()
    readonly user: UserEntity

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty() @IsNumber()
    readonly totalPrice: number

    @IsNotEmpty() @IsNumber()
    readonly tax: number

    @IsNotEmpty() @IsNumber()
    readonly discount: number

    @IsNotEmpty() @IsNumber()
    readonly totalPayment: number

    @IsNotEmpty() @IsString()
    readonly methodPayment: string

    @IsNotEmpty()
    readonly statusPayment: "finished" | "pending" | "canceled"

    @IsNotEmpty()
    readonly transactionTime: string
}