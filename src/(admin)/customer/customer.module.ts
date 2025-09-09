import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MemberEntity } from "src/databases/entities/user/member.entity";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([MemberEntity])
    ],
    controllers: [
        CustomerController,
    ],
    providers: [
        CustomerService,
    ],
})

export class CustomerModule { }