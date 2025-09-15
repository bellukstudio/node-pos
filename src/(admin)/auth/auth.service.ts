import { BadRequestException, Injectable, ConflictException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import { verifyPassword, hashPassword } from "src/core/helpers/password";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { Role } from "src/core/enum/role.enum";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Register a new user
     *
     * @throws {ConflictException} if email already exists
     * @throws {BadRequestException} if validation fails
     * @param {RegisterDto} registerDto
     * @returns {Promise<{ message: string, user: Partial<UserEntity> }>}
     */
    async register(registerDto: RegisterDto): Promise<{
        message: string,
        user: Partial<UserEntity>,
        token?: string
    }> {
        const { name, email, password, role, branch_id } = registerDto;

        const existingUser = await this.userRepository.findOne({
            where: { email },
            withDeleted: false
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await hashPassword(password);

        const newUser = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
            role: role ?? Role.Cashier,
            status: 'active',
            branch: branch_id ? { id: branch_id } : undefined
        });


        try {
            const savedUser = await this.userRepository.save(newUser);

            const { password: _, ...userResponse } = savedUser;

            const token = this.jwtService.sign({
                email: savedUser.email,
                role: savedUser.role,
                id: savedUser.id
            });

            return {
                message: 'User registered successfully',
                user: userResponse,
                token
            };

        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User with this email already exists');
            }
            throw new BadRequestException('Failed to create user');
        }
    }


    /**
     * Register admin user (with additional validation)
     *
     * @throws {ConflictException} if email already exists
     * @throws {BadRequestException} if validation fails
     * @param {RegisterDto} registerDto
     * @returns {Promise<{ message: string, user: Partial<UserEntity> }>}
     */
    async registerAdmin(registerDto: RegisterDto): Promise<{
        message: string,
        user: Partial<UserEntity>
    }> {
        const adminRegisterDto = {
            ...registerDto,
            role: Role.Admin
        };

        const existingAdmin = await this.userRepository.findOne({
            where: { role: Role.Admin },
            withDeleted: false
        });

        if (existingAdmin) {
            throw new ConflictException('Admin user already exists');
        }

        const result = await this.register(adminRegisterDto);

        const { token, ...response } = result;
        return response;
    }

    /**
     * Register super admin user (highest privilege)
     *
     * @throws {ConflictException} if email already exists or super admin exists
     * @throws {BadRequestException} if validation fails
     * @param {RegisterDto} registerDto
     * @returns {Promise<{ message: string, user: Partial<UserEntity> }>}
     */
    async registerSuperAdmin(registerDto: RegisterDto): Promise<{
        message: string,
        user: Partial<UserEntity>
    }> {
        const superAdminRegisterDto = {
            ...registerDto,
            role: Role.SuperAdmin
        };

        const existingSuperAdmin = await this.userRepository.findOne({
            where: { role: Role.SuperAdmin },
            withDeleted: false
        });

        if (existingSuperAdmin) {
            throw new ConflictException('Super admin user already exists');
        }

        const result = await this.register(superAdminRegisterDto);

        const { token, ...response } = result;
        return response;
    }

    /**
     * Login to get a JWT token
     *
     * @throws {BadRequestException} if password is incorrect
     * @throws {Error} if user is not found
     * @param {LoginDto} loginDto
     * @returns {Promise<{ token: string, user: Partial<UserEntity> }>} a JWT token and user info
     */
    async login(loginDto: LoginDto): Promise<{
        token: string,
        user: Partial<UserEntity>
    }> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({
            where: { email },
            withDeleted: false
        });

        if (!user) {
            throw new BadRequestException('Invalid email or password');
        }

        if (user.status !== 'active') {
            throw new BadRequestException('User account is not active');
        }

        if (!(await verifyPassword(password, user.password))) {
            throw new BadRequestException('Invalid email or password');
        }

        await this.userRepository.update(user.id, {
            updated_at: new Date()
        });

        const { password: _, ...userResponse } = user;

        const token = this.jwtService.sign({
            email: user.email,
            role: user.role,
            id: user.id
        });

        return {
            token,
            user: userResponse
        };
    }



}