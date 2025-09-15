import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: "User email address",
        example: "john.doe@example.com",
        format: "email"
    })
    @IsNotEmpty()
    @IsEmail({}, { message: "Please enter correct email" })
    readonly email: string;

    @ApiProperty({
        description: "User password (minimum 6 characters)",
        example: "SecurePass123!",
        minLength: 6
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;
}
