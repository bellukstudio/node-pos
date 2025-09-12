import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ShiftActivityLogEntity } from "src/databases/entities/shift/log-shift-activity.entity";

export class ShiftActivityLogDto {
    @IsNotEmpty()
    readonly shift: ShiftActivityLogEntity;

    @IsNotEmpty()
    @IsEnum(['sale', 'return', 'stock_transfer', 'transaction_cancel', 'other'])
    readonly activity_type: 'sale' | 'return' | 'stock_transfer' | 'transaction_cancel' | 'other';

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    readonly activity_time?: Date;
}
