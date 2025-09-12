import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CustomerDto {

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly customer_id: number

    @IsNotEmpty() @IsString()
    readonly name: string

    @IsNotEmpty() @IsString()
    readonly email: string

    @IsNotEmpty() @IsString()
    readonly phone_number: string

    @IsNotEmpty() @IsString()
    readonly address: string

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly loyalty_point: number
}