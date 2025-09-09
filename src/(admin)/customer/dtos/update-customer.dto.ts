import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCustomerDto {

    @IsNotEmpty() @IsNumber()
    readonly customer_id: number

    @IsNotEmpty() @IsString()
    readonly name: string

    @IsNotEmpty() @IsString()
    readonly email: string

    @IsNotEmpty() @IsString()
    readonly phoneNumber: string

    @IsNotEmpty() @IsString()
    readonly address: string

    @IsNotEmpty() @IsString()
    readonly loyalty_point: string
}