import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";

@Controller()
export class AuthController {
    constructor(
        private readonly authService : AuthService
    ){}


    @Post('login')
    /**
     * Login to get a JWT token
     *
     * @throws {BadRequestException} if password is incorrect
     * @throws {Error} if user is not found
     * @param {LoginDto} loginDto
     * @returns {Promise<{ token: string }>} a JWT token
     */
    async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }
}