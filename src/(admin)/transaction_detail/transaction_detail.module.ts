import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionDetailController } from "./transaction_detail.controller";
import { TransactionDetailService } from "./transaction_detail.service";
import { SalesDetailEntity } from "../../databases/entities/sales/sales-detail.entity";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([SalesDetailEntity]),
    ],
    controllers: [
        TransactionDetailController
    ],
    providers: [
        TransactionDetailService
    ],
})

export class TransactionDetailModule {}