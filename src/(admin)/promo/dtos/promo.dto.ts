import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class PromoDto {
    @ApiProperty({
        description: "Nama promo",
        example: "Promo Akhir Tahun"
    })
    @IsNotEmpty()
    @IsString()
    readonly promo_name: string;

    @ApiProperty({
        description: "Jenis promo yang berlaku",
        example: "percentage",
        enum: ["percentage", "fixed", "free", "buy", "special"]
    })
    @IsNotEmpty()
    @IsEnum(["percentage", "fixed", "free", "buy", "special"])
    readonly type_promo: "percentage" | "fixed" | "free" | "buy" | "special";

    @ApiProperty({
        description: "Nilai promo (bisa berupa angka atau deskripsi, tergantung jenis promo)",
        example: "10" // jika percentage berarti 10%, jika fixed berarti jumlah potongan
    })
    @IsNotEmpty()
    @IsString()
    readonly promo_value: string;

    @ApiProperty({
        description: "Cabang tempat promo berlaku",
        type: () => BranchEntity
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Produk yang mendapatkan promo",
        type: () => ProductEntity
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiPropertyOptional({
        description: "Tanggal berakhirnya promo",
        type: String,
        format: "date-time",
        example: "2025-12-31T23:59:59.000Z"
    })
    @IsOptional()
    @IsDate()
    readonly expired: Date;

    @ApiProperty({
        description: "Status promo (aktif / non-aktif)",
        example: true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly status: boolean;
}
