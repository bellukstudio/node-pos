import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PointsLoyaltyEntity } from "src/databases/entities/program/points-loyalty.entity";
import { LoyaltyController } from "./loyalty.controller";
import { LoyaltyService } from "./loyalty.service";

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