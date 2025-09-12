import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { UserEntity } from "src/databases/entities/user/users.entity";

export class ShiftDto {

    @IsNotEmpty()
    readonly branch: BranchEntity

    @IsNotEmpty()
    readonly cashier: UserEntity

    @IsNotEmpty() @IsString()
    readonly time_in: string;

    @IsOptional() @IsString()
    readonly time_out?: string;

    @IsOptional() @Type(() => Number) @IsNumber()
    readonly total_sales?: number;

    @IsOptional() @Type(() => Number) @IsNumber()
    readonly total_transactions?: number;

    @IsOptional() @Type(() => Number) @IsNumber()
    readonly opening_cash?: number;

    @IsOptional() @Type(() => Number) @IsNumber()
    readonly closing_cash?: number;

    @IsOptional() @IsString()
    readonly shift_note?: string;

    @IsOptional()
    @IsEnum(['active', 'closed', 'cancelled'])
    readonly shift_status?: 'active' | 'closed' | 'cancelled';

}