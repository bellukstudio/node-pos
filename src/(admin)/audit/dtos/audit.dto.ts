import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { BranchEntity } from '../../../databases/entities/branch/branch.entity';
import { UserEntity } from '../../../databases/entities/user/users.entity';

export class AuditLogDto {
    @ApiProperty({
        description: 'User yang melakukan aktivitas',
        example: { id: '123e4567-e89b-12d3-a456-426614174000' },
    })
    @IsNotEmpty()
    @IsObject()
    readonly user: UserEntity;

    @ApiProperty({
        description: 'Cabang tempat aktivitas dilakukan',
        example: { id: '123e4567-e89b-12d3-a456-426614174001' },
    })
    @IsNotEmpty()
    @IsObject()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: 'Modul yang mengalami aktivitas',
        enum: [
            'product',
            'sale',
            'customer',
            'report',
            'setting',
            'purchase',
            'shift',
            'stock',
            'user',
            'supplier',
            'program',
        ],
        example: 'product',
    })
    @IsNotEmpty()
    @IsEnum([
        'product',
        'sale',
        'customer',
        'report',
        'setting',
        'purchase',
        'shift',
        'stock',
        'user',
        'supplier',
        'program',
    ])
    readonly module:
        | 'product'
        | 'sale'
        | 'customer'
        | 'report'
        | 'setting'
        | 'purchase'
        | 'shift'
        | 'stock'
        | 'user'
        | 'supplier'
        | 'program';

    @ApiProperty({
        description: 'Jenis aktivitas yang dicatat',
        enum: ['create', 'update', 'delete', 'login', 'logout', 'print_receipt'],
        example: 'create',
    })
    @IsNotEmpty()
    @IsEnum(['create', 'update', 'delete', 'login', 'logout', 'print_receipt'])
    readonly action:
        | 'create'
        | 'update'
        | 'delete'
        | 'login'
        | 'logout'
        | 'print_receipt';

    @ApiProperty({
        description: 'Deskripsi aktivitas',
        example: 'Created new product: Sabun Mandi',
    })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiPropertyOptional({
        description: 'Alamat IP pengguna',
        example: '192.168.1.10',
    })
    @IsOptional()
    @IsString()
    readonly ip_address?: string;

    @ApiPropertyOptional({
        description: 'Informasi perangkat pengguna',
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    })
    @IsOptional()
    @IsString()
    readonly device_info?: string;
}
