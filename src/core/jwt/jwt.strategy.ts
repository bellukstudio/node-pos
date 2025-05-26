import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserEntity } from "../entities/users.entity";
import { Repository } from "typeorm";

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
    async validate(payload: any) {
        const { id } = payload;
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new UnauthorizedException('Login first to access this endpoint'); //* Throw exception if user not found
        }

        return user;
    }
}