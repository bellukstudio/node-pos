import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShiftActivityLogEntity } from "src/databases/entities/shift/log-shift-activity.entity";
import { ShiftEntity } from "src/databases/entities/shift/shift.entity";
import { ShiftController } from "./shift.controller";
import { ShiftService } from "./shift.service";


@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([ShiftActivityLogEntity, ShiftEntity])
    ],
    controllers: [
        ShiftController
    ],
    providers: [
        ShiftService
    ],
})
export class ShiftModule { }