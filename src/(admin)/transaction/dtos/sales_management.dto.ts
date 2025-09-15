import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { UserEntity } from "src/databases/entities/user/users.entity";

export class SalesManagementDto {
    @ApiProperty({
        description: "Nomor transaksi unik",
        example: "TRX-20250912-001"
    })
    @IsNotEmpty()
    @IsString()
    readonly transaction_number: string;

    @ApiProperty({
        description: "User yang membuat transaksi",
        type: () => UserEntity
    })
    @IsNotEmpty()
    readonly user: UserEntity;

    @ApiProperty({
        description: "Branch tempat transaksi dilakukan",
        type: () => BranchEntity
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Total harga sebelum pajak dan diskon",
        example: 500000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_price: number;

    @ApiProperty({
        description: "Jumlah pajak transaksi",
        example: 50000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly tax: number;

    @ApiProperty({
        description: "Jumlah diskon transaksi",
        example: 25000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly discount: number;

    @ApiProperty({
        description: "Total pembayaran setelah pajak & diskon",
        example: 525000
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly total_payment: number;

    @ApiProperty({
        description: "Metode pembayaran",
        example: "cash"
    })
    @IsNotEmpty()
    @IsString()
    readonly method_payment: string;

    @ApiProperty({
        description: "Status pembayaran",
        enum: ["finished", "pending", "canceled"],
        example: "finished"
    })
    @IsNotEmpty()
    @IsEnum(["finished", "pending", "canceled"])
    readonly status_payment: "finished" | "pending" | "canceled";

    @ApiProperty({
        description: "Waktu transaksi (format ISO string)",
        example: "2025-09-12T10:15:00.000Z"
    })
    @IsNotEmpty()
    @IsString()
    readonly transaction_time: string;
}
