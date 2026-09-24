import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";
import { MemberEntity } from "../../databases/entities/user/member.entity";

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