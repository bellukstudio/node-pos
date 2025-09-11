import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailPurchaseEntity } from "src/databases/entities/supply/detail-purchase.entity";
import { DetailPurchaseController } from "./detail-purchase.controller";
import { DetailPurchaseService } from "./detail-purchase.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([DetailPurchaseEntity])
    ],
    controllers: [
        DetailPurchaseController
    ],
    providers: [
        DetailPurchaseService
    ],
})

export class DetailPurchaseModule {}