import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { CurrentUser } from "src/core/decorators/current-user";
import { AccessRightDto } from "./dtos/access-rights.dto";
import { GeneralSettingDto } from "./dtos/setting.dto";

@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class SettingController {
    constructor(private readonly settingService: SettingsService) { }


    @Get("settings/general")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Retrieves the general setting.
     *
     * @returns {Promise<GeneralSettingEntity>} The general setting
     */
    getSettings() {
        return this.settingService.getGeneralSetting();
    }


    @Get("settings/access-rights/:branchId")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Retrieves the user access rights for a branch.
     *
     * @param user - The current user
     * @param branchId - The branch id
     * @returns {Promise<UserAccessRightsEntity[]>} The user access rights
     */
    getUserRights(
        @CurrentUser() user: any,
        @Param("branchId") branchId: string
    ) {
        return this.settingService.getUserRights(user.id, branchId);
    }


    @Get("settings/access-rights/module/:module/:action")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Retrieves the user access rights for a module.
     *
     * @param module - The module name
     * @param action - The action name
     * @throws {NotFoundException} If the user access right is not found
     * @returns {Promise<UserAccessRightsEntity | null>} The user access right
     */
    getUserRightForModule(
        @CurrentUser() user: any,
        @Param("module")
        module:
            | "product"
            | "report"
            | "customer"
            | "audit"
            | "branch"
            | "program"
            | "sales"
            | "setting"
            | "shift"
            | "supply"
            | "stock"
            | "user",
        @Param("action") action: "create" | "read" | "update" | "delete"
    ) {
        return this.settingService.getUserRightForModule(user.id, module, action);
    }

    @Post("settings/access-rights/module/create")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new user access right.
     *
     * @param dto - The data transfer object containing the new user access right information
     * @throws {NotFoundException} If the user or branch is not found
     * @returns {Promise<UserAccessRightsEntity>} The newly created user access right
     */
    createUserRightForModule(@Body() dto: AccessRightDto) {
        return this.settingService.createUserAccessRight(dto);
    }


    @Put("settings/access-rights/module/update/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing user access right.
     *
     * @param id - The id of the user access right to update
     * @param dto - The data transfer object containing the updated user access right information
     * @throws {NotFoundException} If the user access right is not found
     * @returns {Promise<UserAccessRightsEntity>} The updated user access right
     */
    updateUserRightForModule(
        @Param("id") id: string,
        @Body() dto: AccessRightDto
    ) {
        return this.settingService.updateUserAccessRight(id, dto);
    }


    @Post("settings/general/create")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Saves the general setting.
     *
     * If the setting already exists, it will be updated. Otherwise, a new setting will be created.
     *
     * @param dto - The data transfer object containing the setting information
     * @returns {Promise<GeneralSettingEntity>} The saved general setting
     */
    saveGeneralSetting(@Body() dto: GeneralSettingDto) {
        return this.settingService.saveGeneralSetting(dto);
    }
}
