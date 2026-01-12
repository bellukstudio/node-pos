import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseProductController } from "./purchase-product.controller";
import { PurchaseProductService } from "./purchase-product.service";
import { PurchaseProductEntity } from "../../databases/entities/supply/purchase-product.entity";


@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([PurchaseProductEntity])],
    controllers: [
        PurchaseProductController
    ],
    providers: [
        PurchaseProductService
    ],
})

export class PurchaseProductModule { }