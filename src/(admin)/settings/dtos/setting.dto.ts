import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";

export class GeneralSettingDto {
    @ApiProperty({ description: "Nama toko yang akan ditampilkan", example: "Toko Sejahtera" })
    @IsNotEmpty()
    @IsString()
    readonly store_name: string;

    @ApiProperty({ description: "Alamat lengkap toko", example: "Jl. Raya No. 123, Jakarta" })
    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @ApiProperty({ description: "Nomor telepon toko", example: "081234567890" })
    @IsNotEmpty()
    @IsString()
    readonly phone_number: string;

    @ApiProperty({ description: "Email resmi toko", example: "admin@tokosejahtera.com" })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({ description: "Persentase pajak global (dalam %)", example: 10 })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly tax: number;

    @ApiProperty({ description: "Diskon global default (dalam %)", example: 5 })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly global_discount: number;
}
