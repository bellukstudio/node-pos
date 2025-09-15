import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class SupplyManagementDto {
    @ApiProperty({
        description: "Nama supplier",
        example: "PT Sumber Makmur"
    })
    @IsNotEmpty()
    @IsString()
    readonly supplier_name: string;

    @ApiProperty({
        description: "Nomor kontak supplier",
        example: "081234567890"
    })
    @IsNotEmpty()
    @IsString()
    readonly contact: string;

    @ApiProperty({
        description: "Alamat lengkap supplier",
        example: "Jl. Sudirman No. 45, Jakarta"
    })
    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @ApiProperty({
        description: "Email supplier",
        example: "supplier@sumbermakmur.com"
    })
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty({
        description: "Status aktif/tidaknya supplier",
        example: true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean;
}
