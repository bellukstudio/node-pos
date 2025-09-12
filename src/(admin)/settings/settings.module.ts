import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeneralSettingEntity } from "src/databases/entities/setting/general-setting.entity";
import { UserAccessRightsEntity } from "src/databases/entities/setting/user-access-rights.entity";
import { SettingController } from "./settings.controller";
import { SettingsService } from "./settings.service";

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