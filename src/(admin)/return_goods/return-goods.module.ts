import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReturnOfGoodsEntity } from "src/databases/entities/stock/return-of-goods.entity";
import { ReturnGoodsController } from "./return-goods.controller";
import { ReturnOfGoodsService } from "./return-goods.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ReturnOfGoodsEntity])
    ],
    controllers: [
        ReturnGoodsController
    ],
    providers: [
        ReturnOfGoodsService
    ],
})
export class ReturnGoodsModule {}