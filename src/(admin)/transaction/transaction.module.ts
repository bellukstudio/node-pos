import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { AuthModule } from "../auth/auth.module";
import { SalesManagementEntity } from "../../databases/entities/sales/sales-management.entity";
@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([SalesManagementEntity]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule { }