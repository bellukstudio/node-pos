import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/(admin)/auth/auth.module";
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([SalesManagementEntity]),
    ],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule { }