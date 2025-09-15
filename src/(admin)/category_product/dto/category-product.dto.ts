import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CategoryProductDto {
    @ApiProperty({
        description: "Nama kategori produk",
        example: "Makanan"
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: "Deskripsi kategori produk",
        example: "Kategori untuk semua jenis makanan"
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;
}
