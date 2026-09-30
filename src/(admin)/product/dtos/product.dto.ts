import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryProductEntity } from '../../../databases/entities/product/category-product.entity';
import { BranchEntity } from '../../../databases/entities/branch/branch.entity';

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

    @ApiPropertyOptional({
        description: "URL gambar produk",
        example: "https://example.com/product.jpg",
        nullable: true,
    })
    @IsOptional()
    @IsString()
    readonly image?: string | null;

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
        example: { id: "123e4567-e89b-12d3-a456-426614174000" },
    })
    @IsNotEmpty()
    readonly category: CategoryProductEntity;

    @ApiProperty({
        description: "Cabang tempat produk tersedia",
        type: () => BranchEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174001" },
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;
}
