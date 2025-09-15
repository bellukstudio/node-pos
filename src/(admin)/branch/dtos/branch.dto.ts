import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class BranchDto {
    @ApiProperty({
        description: "Nama cabang",
        example: "Cabang Jakarta Pusat"
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: "Alamat cabang",
        example: "Jl. Sudirman No. 123"
    })
    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @ApiProperty({
        description: "Kota tempat cabang berada",
        example: "Jakarta"
    })
    @IsNotEmpty()
    @IsString()
    readonly city: string;

    @ApiProperty({
        description: "Provinsi tempat cabang berada",
        example: "DKI Jakarta"
    })
    @IsNotEmpty()
    @IsString()
    readonly province: string;

    @ApiProperty({
        description: "Nomor telepon cabang",
        example: "021-12345678"
    })
    @IsNotEmpty()
    @IsString()
    readonly phone_number: string;

    @ApiProperty({
        description: "Status aktif/tidak aktif cabang",
        example: true,
        default: true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean;
}
