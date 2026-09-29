import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class RefreshTokenDto {
    @ApiProperty({
        description: "Refresh token received from the login endpoint",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    })
    @IsNotEmpty()
    @IsString()
    readonly refreshToken: string;
}
