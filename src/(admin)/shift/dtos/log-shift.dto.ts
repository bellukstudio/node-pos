import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ShiftActivityLogEntity } from "src/databases/entities/shift/log-shift-activity.entity";

export class ShiftActivityLogDto {
    @ApiProperty({
        description: "Referensi shift yang terkait dengan aktivitas ini",
        type: () => ShiftActivityLogEntity
    })
    @IsNotEmpty()
    readonly shift: ShiftActivityLogEntity;

    @ApiProperty({
        description: "Jenis aktivitas yang dilakukan",
        enum: ['sale', 'return', 'stock_transfer', 'transaction_cancel', 'other'],
        example: 'sale'
    })
    @IsNotEmpty()
    @IsEnum(['sale', 'return', 'stock_transfer', 'transaction_cancel', 'other'])
    readonly activity_type: 'sale' | 'return' | 'stock_transfer' | 'transaction_cancel' | 'other';

    @ApiProperty({
        description: "Deskripsi detail dari aktivitas",
        example: "Melakukan penjualan barang A sebanyak 5 unit"
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiPropertyOptional({
        description: "Waktu aktivitas (opsional). Jika tidak diisi, gunakan waktu saat ini",
        example: "2025-09-12T10:30:00.000Z"
    })
    @IsOptional()
    readonly activity_time?: Date;
}
