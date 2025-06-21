import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }