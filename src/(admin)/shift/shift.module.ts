import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShiftController } from "./shift.controller";
import { ShiftService } from "./shift.service";
import { ShiftEntity } from "../../databases/entities/shift/shift.entity";
import { ShiftActivityLogEntity } from "../../databases/entities/shift/log-shift-activity.entity";


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