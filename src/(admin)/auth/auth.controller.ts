import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { UserEntity } from "../../databases/entities/user/users.entity";
import { JwtAuthGuard } from "../../core/guard/jwt.guard";
import { CurrentUser } from "../../core/decorators/current-user.decorator";
import { RefreshTokenDto } from "./dtos/refresh-token.dto";

@ApiTags("Auth")
@Controller()
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post("register")
    @ApiOperation({ summary: "Register a new user" })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: "User registered successfully", type: UserEntity })
    @ApiResponse({ status: 409, description: "User with this email already exists" })
    /**
     * Register a new user
     *
     * @summary Register a new user
     * @description This endpoint registers a new user with given credentials.
     * @throws {ConflictException} if email already exists
     * @throws {BadRequestException} if validation fails
     */
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post("register-admin")
    @ApiOperation({ summary: "Register an admin user (only once)" })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: "Admin user registered successfully", type: UserEntity })
    @ApiResponse({ status: 409, description: "Admin user already exists" })
    /**
     * Register an admin user (with additional validation)
     *
     * @summary Register an admin user
     * @description This endpoint registers an admin user with additional validation.
     * @throws {ConflictException} if email already exists
     * @throws {BadRequestException} if validation fails
     * @param {RegisterDto} registerDto
     * @returns {Promise<{ message: string, user: Partial<UserEntity> }>}
     */
    async registerAdmin(@Body() registerDto: RegisterDto) {
        return this.authService.registerAdmin(registerDto);
    }

    @Post("register-super-admin")
    @ApiOperation({ summary: "Register a super admin user (highest privilege, only once)" })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: "Super admin user registered successfully", type: UserEntity })
    @ApiResponse({ status: 409, description: "Super admin user already exists" })
    /**
     * Register a super admin user (highest privilege, only once)
     *
     * @summary Register a super admin user
     * @description This endpoint registers a super admin user with highest privilege.
     * @throws {ConflictException} if email already exists or super admin exists
     * @throws {BadRequestException} if validation fails
     * @param {RegisterDto} registerDto
     * @returns {Promise<{ message: string, user: Partial<UserEntity> }>}
     */
    async registerSuperAdmin(@Body() registerDto: RegisterDto) {
        return this.authService.registerSuperAdmin(registerDto);
    }

    @Post("login")
    @ApiOperation({ summary: "Login and receive JWT token" })
    @ApiBody({ type: LoginDto })
    @ApiResponse({
        status: 200,
        description: "Login successful, returns token and user data",
        schema: {
            example: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                user: {
                    id: "123456",
                    name: "John Doe",
                    email: "john@example.com",
                    role: "cashier",
                    status: "active"
                }
            }
        }
    })
    @ApiResponse({ status: 400, description: "Invalid email or password" })
    /**
     * Login and receive JWT token
     * @param loginDto - User login credentials
     * @returns Promise containing JWT token and user data
     * @throws {BadRequestException} if email or password is invalid
     */
    async login(@Body() loginDto: LoginDto): Promise<{ token: string, refreshToken: string }> {
        return this.authService.login(loginDto);
    }

    @Post("auth/refresh-token")
    @ApiOperation({ summary: "Refresh the access JWT token" })
    @ApiBody({ type: RefreshTokenDto })
    @ApiResponse({
        status: 200,
        description: "Access token refreshed successfully",
        schema: { example: { token: "******" } },
    })
    @ApiResponse({ status: 401, description: "Invalid or expired refresh token" })
    refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ token: string }> {
        return this.authService.refreshToken(refreshTokenDto);
    }

    @Get("auth/me")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Get the authenticated user profile" })
    @ApiResponse({ status: 200, description: "Authenticated user profile" })
    getMe(@CurrentUser() user: UserEntity) {
        return this.authService.getCurrentUser(user.id);
    }

    @Post("auth/logout")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Log out and revoke the current user's JWTs" })
    @ApiResponse({ status: 200, description: "Logged out successfully" })
    logout(@CurrentUser() user: UserEntity) {
        return this.authService.logout(user.id);
    }
}
