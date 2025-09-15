import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { ProductEntity } from "src/databases/entities/product/product.entity";

export enum MutationType {
    IN = "in",
    OUT = "out",
    DAMAGED = "damaged",
    RETURN = "return",
}

export class MutationStockDto {
    @ApiProperty({
        description: "Produk yang mengalami perubahan stok",
        type: () => ProductEntity,
    })
    @IsNotEmpty()
    readonly product: ProductEntity;

    @ApiProperty({
        description: "Cabang tempat stok berubah",
        type: () => BranchEntity,
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Jenis mutasi stok",
        enum: MutationType,
        example: MutationType.IN,
    })
    @IsNotEmpty()
    @IsEnum(MutationType)
    readonly type: MutationType;

    @ApiProperty({
        description: "Jumlah barang yang dimutasi",
        example: 10,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly amount: number;

    @ApiProperty({
        description: "Sisa stok setelah mutasi",
        example: 90,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly remaining_stock: number;

    @ApiProperty({
        description: "Tanggal terjadinya mutasi",
        example: "2025-09-12T10:00:00Z",
        type: String,
        format: "date-time",
    })
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly mutation_date: Date;
}
