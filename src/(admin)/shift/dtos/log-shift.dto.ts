import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ShiftEntity } from "../../../databases/entities/shift/shift.entity";

export class ShiftActivityLogDto {
    @ApiProperty({
        description: "Referensi shift yang terkait dengan aktivitas ini",
        type: () => ShiftEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly shift: ShiftEntity;

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
        example: "2025-09-12T10:30:00.000Z",
        type: String,
        format: "date-time"
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly activity_time?: Date;
}
