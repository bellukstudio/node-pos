import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DetailPurchaseController } from "./detail-purchase.controller";
import { DetailPurchaseService } from "./detail-purchase.service";
import { DetailPurchaseEntity } from "../../databases/entities/supply/detail-purchase.entity";

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