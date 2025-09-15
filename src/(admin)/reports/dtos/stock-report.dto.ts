import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export class StockReportDto {
    @ApiProperty({
        description: "Produk yang dilaporkan",
        type: () => ProductEntity
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({
        description: "Cabang yang membuat laporan",
        type: () => BranchEntity
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Jumlah stok awal sebelum transaksi",
        example: 100,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly initial_stock: number;

    @ApiProperty({
        description: "Jumlah stok yang sudah terjual",
        example: 40,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly stock_sold: number;

    @ApiProperty({
        description: "Jumlah stok yang masuk (pembelian/penambahan)",
        example: 20,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly stock_in: number;

    @ApiProperty({
        description: "Sisa stok setelah perhitungan (stok akhir)",
        example: 80,
        type: Number
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly remaining_stock: number;
}
