import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    MinLength,
    MaxLength,
    IsOptional,
    IsUUID,
    IsIn,
    Matches
} from 'class-validator';
import { Role } from 'src/core/enum/role.enum';

export class RegisterDto {
    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        minLength: 2,
        maxLength: 100
    })
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
    @MaxLength(100, { message: 'Name must not exceed 100 characters' })
    name: string;

    @ApiProperty({
        description: 'User email address',
        example: 'john.doe@example.com',
        format: 'email'
    })
    @IsEmail({}, { message: 'Please provide a valid email address' })
    email: string;

    @ApiProperty({
        description: 'User password (minimum 6 characters)',
        example: 'SecurePass123!',
        minLength: 6
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    })
    password: string;

    @ApiPropertyOptional({
        description: 'User role in the system',
        example: Role.Manager,
        enum: Role,
        default: Role.Cashier
    })
    @IsOptional()
    @IsIn(Object.values(Role))
    role?: Role;

    @ApiPropertyOptional({
        description: 'User status in the system',
        example: 'active',
        default: 'active'
    })
    @IsOptional()
    status?: string;

    @ApiPropertyOptional({
        description: 'Branch ID that user belongs to',
        example: '123e4567-e89b-12d3-a456-426614174000',
        format: 'uuid'
    })
    @IsOptional()
    @IsUUID('4', { message: 'Branch ID must be a valid UUID' })
    branch_id?: string;
}
