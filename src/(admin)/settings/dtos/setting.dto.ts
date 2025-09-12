import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GeneralSettingDto {
    @IsNotEmpty() @IsString()
    readonly store_name: string;

    @IsNotEmpty() @IsString()
    readonly address: string;

    @IsNotEmpty() @IsString()
    readonly phone_number: string;

    @IsNotEmpty() @IsString()
    readonly email: string;

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly tax: number;

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly global_discount: number;
}
