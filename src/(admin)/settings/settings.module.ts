import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SettingController } from "./settings.controller";
import { SettingsService } from "./settings.service";
import { UserAccessRightsEntity } from "../../databases/entities/setting/user-access-rights.entity";
import { GeneralSettingEntity } from "../../databases/entities/setting/general-setting.entity";

@Module({
    imports: [
        AuthModule,
        TypeOrmModule.forFeature([GeneralSettingEntity, UserAccessRightsEntity])
    ],
    controllers: [
        SettingController
    ],
    providers: [
        SettingsService
    ],
})
export class SettingsModule { }