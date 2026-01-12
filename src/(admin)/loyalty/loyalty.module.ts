import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { LoyaltyController } from "./loyalty.controller";
import { LoyaltyService } from "./loyalty.service";
import { PointsLoyaltyEntity } from "../../databases/entities/program/points-loyalty.entity";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([PointsLoyaltyEntity])
    ],
    controllers: [
        LoyaltyController
    ],
    providers: [
        LoyaltyService
    ],
    
})
export class LoyaltyModule {}