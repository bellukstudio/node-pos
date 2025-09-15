import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsEmail } from "class-validator";

export class CustomerDto {
    @ApiProperty({
        description: "ID unik pelanggan (otomatis dari database)",
        example: 101
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly customer_id: number;

    @ApiProperty({
        description: "Nama lengkap pelanggan",
        example: "John Doe"
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: "Alamat email pelanggan",
        example: "john.doe@example.com",
        format: "email"
    })
    @IsNotEmpty()
    @IsEmail({}, { message: "Please provide a valid email address" })
    readonly email: string;

    @ApiProperty({
        description: "Nomor telepon pelanggan",
        example: "+628123456789"
    })
    @IsNotEmpty()
    @IsString()
    readonly phone_number: string;

    @ApiProperty({
        description: "Alamat pelanggan",
        example: "Jl. Sudirman No. 123, Jakarta"
    })
    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @ApiProperty({
        description: "Jumlah poin loyalitas pelanggan",
        example: 150
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly loyalty_point: number;
}
