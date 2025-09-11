import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PurchaseProductEntity } from "src/databases/entities/supply/purchase-product.entity";
import { PurchaseProductController } from "./purchase-product.controller";
import { PurchaseProductService } from "./purchase-product.service";


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