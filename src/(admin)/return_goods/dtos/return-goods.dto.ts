import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class ReturnGoodsDto {
    @ApiProperty({ description: "Produk yang dikembalikan", type: () => ProductEntity })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({ description: "Cabang tempat pengembalian terjadi", type: () => BranchEntity })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({ description: "Jumlah barang yang dikembalikan", example: 5, type: Number })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly amount: number;

    @ApiProperty({ description: "Alasan pengembalian barang", example: "Produk rusak" })
    @IsNotEmpty()
    @IsString()
    readonly reason: string;

    @ApiProperty({
        description: "Tipe pengembalian (ke pelanggan atau ke supplier)",
        enum: ["to_customer", "to_supplier"],
        example: "to_customer"
    })
    @IsNotEmpty()
    @IsEnum(['to_customer', 'to_supplier'])
    readonly type: 'to_customer' | 'to_supplier';

    @ApiProperty({ description: "Tanggal pengembalian barang", example: "2025-09-12T10:30:00.000Z", type: String, format: "date-time" })
    @IsNotEmpty()
    @IsDate()
    readonly return_date: Date;
}
