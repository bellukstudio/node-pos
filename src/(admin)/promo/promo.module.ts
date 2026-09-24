import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PromoController } from "./promo.controller";
import { PromoService } from "./promo.service";
import { DiscountNpromoEntity } from "../../databases/entities/program/discount-npromo.entity";

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