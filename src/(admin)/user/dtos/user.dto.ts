import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Role } from "../../../core/enum/role.enum";
import { BranchEntity } from "../../../databases/entities/branch/branch.entity";

export class UserDto {
    @ApiProperty({ description: "Nama lengkap user", example: "John Doe" })
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({ description: "Alamat email user", example: "johndoe@mail.com" })
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty({ description: "Nomor telepon user", example: "08123456789" })
    @IsNotEmpty()
    @IsString()
    readonly phone: string;

    @ApiProperty({ description: "Password user (hash lebih aman)", example: "mypassword123" })
    @IsNotEmpty()
    @IsString()
    readonly password: string;

    @ApiProperty({ description: "Role user", enum: Role, example: Role.Admin })
    @IsNotEmpty()
    @IsEnum(Role)
    readonly role: Role;

    @ApiProperty({ description: "Status user (misalnya: active, inactive)", example: "active" })
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiProperty({
        description: "Branch tempat user bekerja",
        type: () => BranchEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" }
    })
    @IsNotEmpty()
    readonly branch: BranchEntity;
}
