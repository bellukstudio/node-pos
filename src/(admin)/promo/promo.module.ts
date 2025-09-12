import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountNpromoEntity } from "src/databases/entities/program/discount-npromo.entity";
import { PromoController } from "./promo.controller";
import { PromoService } from "./promo.service";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([DiscountNpromoEntity]),
    ],
    controllers: [
        PromoController
    ],
    providers: [
        PromoService
    ],
})
export class PromoModule {}