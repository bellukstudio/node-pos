import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { UserEntity } from 'src/databases/entities/user/users.entity';
import { BranchEntity } from 'src/databases/entities/branch/branch.entity';

export class AuditLogDto {
    @IsNotEmpty()
    @IsObject()
    readonly user: UserEntity;

    @IsNotEmpty()
    @IsObject()
    readonly branch: BranchEntity;

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

    @IsNotEmpty()
    @IsEnum(['create', 'update', 'delete', 'login', 'logout', 'print_receipt'])
    readonly action:
        | 'create'
        | 'update'
        | 'delete'
        | 'login'
        | 'logout'
        | 'print_receipt';

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsString()
    readonly ip_address?: string;

    @IsOptional()
    @IsString()
    readonly device_info?: string;
}
