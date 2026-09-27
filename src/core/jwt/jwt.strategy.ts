import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from "typeorm";
import { UserEntity } from "../../databases/entities/user/users.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    /**
     * Validate the user from the payload of the JWT token
     * @param payload the payload of the JWT token
     * @returns the user if found, else throw UnauthorizedException
     */
    async validate(payload: { id: string; ver?: number }) {
        const { id, ver = 0 } = payload;
        const user = await this.userRepository.findOne({
            where: { id, status: 'active' },
            select: ['id', 'email', 'role', 'token_version'],
        });

        if (!user || user.token_version !== ver) {
            throw new UnauthorizedException('Authentication failed');
        }

        const { token_version: _, ...authenticatedUser } = user;
        return authenticatedUser;
    }
}