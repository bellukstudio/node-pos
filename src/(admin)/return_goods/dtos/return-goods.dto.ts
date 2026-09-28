import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProductEntity } from "../../../databases/entities/product/product.entity";
import { BranchEntity } from "../../../databases/entities/branch/branch.entity";

export class ReturnGoodsDto {
    @ApiProperty({
        description: "Produk yang dikembalikan",
        type: () => ProductEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({
        description: "Cabang tempat pengembalian terjadi",
        type: () => BranchEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174001" }
    })
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
    @Type(() => Date)
    @IsDate()
    readonly return_date: Date;
}
