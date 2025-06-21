import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoginDto } from "./dtos/login.dto";
import { verifyPassword } from "src/core/helpers/password";
import { UserEntity } from "src/databases/entities/user/users.entity";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService
    ) { }

    /**
     * Login to get a JWT token
     *
     * @throws {BadRequestException} if password is incorrect
     * @throws {Error} if user is not found
     * @param {LoginDto} loginDto
     * @returns {Promise<{ token: string }>} a JWT token
     */
    async login(loginDto: LoginDto): Promise<{ token: string }> {

        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });

        if (!user) throw new Error('User not found');

        if (!(await verifyPassword(password, password))) {
            throw new BadRequestException("Admin account is incorrect.")
        }


        return { token: this.jwtService.sign({ email: email, role: user.role }) };
    }
}