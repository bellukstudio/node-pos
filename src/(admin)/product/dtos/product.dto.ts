import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { CategoryProductEntity } from "src/databases/entities/product/category-product.entity";

export class ProductDto {
    @ApiProperty({
        description: "Nama produk",
        example: "Sabun Mandi",
    })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: "Deskripsi produk",
        example: "Sabun mandi wangi lavender",
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({
        description: "Status produk (aktif atau tidak)",
        example: true,
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean;

    @ApiProperty({
        description: "Kode unik produk",
        example: "PRD-001",
    })
    @IsNotEmpty()
    @IsString()
    readonly code: string;

    @ApiProperty({
        description: "Jumlah stok produk",
        example: 100,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly stock: number;

    @ApiProperty({
        description: "Satuan produk",
        example: "pcs",
    })
    @IsNotEmpty()
    @IsString()
    readonly unit: string;

    @ApiProperty({
        description: "Kode barcode produk",
        example: "8991234567890",
    })
    @IsNotEmpty()
    @IsString()
    readonly barcode: string;

    @ApiProperty({
        description: "Harga beli produk",
        example: 5000,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly purchase_price: number;

    @ApiProperty({
        description: "Harga jual produk",
        example: 7500,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly sale_price: number;

    @ApiProperty({
        description: "Kategori produk",
        type: () => CategoryProductEntity,
    })
    @IsNotEmpty()
    readonly category: CategoryProductEntity;

    @ApiProperty({
        description: "Cabang tempat produk tersedia",
        type: () => BranchEntity,
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;
}
