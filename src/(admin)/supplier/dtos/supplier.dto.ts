import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class SupplierDto{
    @IsNotEmpty() @IsString()
    readonly supplier_name: string

    @IsNotEmpty() @IsString()
    readonly contact: string

    @IsNotEmpty() @IsString()
    readonly address: string

    @IsNotEmpty() @IsString()
    readonly email: string

    @IsNotEmpty() @IsBoolean()
    readonly status: boolean
}