import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { UserEntity } from "src/databases/entities/user/users.entity";

export class ShiftDto {
    @ApiProperty({
        description: "Cabang tempat shift berlangsung",
        type: () => BranchEntity
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "User yang bertugas sebagai kasir pada shift ini",
        type: () => UserEntity
    })
    @IsNotEmpty()
    readonly cashier: UserEntity;

    @ApiProperty({
        description: "Waktu mulai shift (format string, misal '08:00')",
        example: "08:00"
    })
    @IsNotEmpty()
    @IsString()
    readonly time_in: string;

    @ApiPropertyOptional({
        description: "Waktu selesai shift (jika sudah ditutup)",
        example: "17:00"
    })
    @IsOptional()
    @IsString()
    readonly time_out?: string;

    @ApiPropertyOptional({
        description: "Total penjualan selama shift",
        example: 1250000
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly total_sales?: number;

    @ApiPropertyOptional({
        description: "Total transaksi selama shift",
        example: 45
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly total_transactions?: number;

    @ApiPropertyOptional({
        description: "Kas awal pada awal shift",
        example: 500000
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly opening_cash?: number;

    @ApiPropertyOptional({
        description: "Kas akhir pada penutupan shift",
        example: 480000
    })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    readonly closing_cash?: number;

    @ApiPropertyOptional({
        description: "Catatan tambahan untuk shift",
        example: "Kasir mengalami selisih -20.000"
    })
    @IsOptional()
    @IsString()
    readonly shift_note?: string;

    @ApiPropertyOptional({
        description: "Status shift",
        enum: ['active', 'closed', 'cancelled'],
        example: "active"
    })
    @IsOptional()
    @IsEnum(['active', 'closed', 'cancelled'])
    readonly shift_status?: 'active' | 'closed' | 'cancelled';
}
