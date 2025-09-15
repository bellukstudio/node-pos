import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Patch,
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
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Settings")
@ApiBearerAuth()
@Controller("settings")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class SettingController {
    constructor(private readonly settingService: SettingsService) { }

    @Get("general")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Get general settings" })
    @ApiResponse({ status: 200, description: "Returns the general settings" })
    getGeneralSettings() {
        return this.settingService.getGeneralSetting();
    }

    @Get("access-rights/:branchId")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Get user access rights by branch" })
    @ApiParam({ name: "branchId", type: String, description: "Branch ID" })
    @ApiResponse({ status: 200, description: "Returns user access rights for the branch" })
    getUserRights(
        @CurrentUser() user: any,
        @Param("branchId") branchId: string
    ) {
        return this.settingService.getUserRights(user.id, branchId);
    }

    @Get("access-rights/module/:module/:action")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Get user access rights for a specific module & action" })
    @ApiParam({ name: "module", enum: ["product", "report", "customer", "audit", "branch", "program", "sales", "setting", "shift", "supply", "stock", "user"] })
    @ApiParam({ name: "action", enum: ["create", "read", "update", "delete"] })
    @ApiResponse({ status: 200, description: "Returns the access right for this module/action" })
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

    @Post("access-rights")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create a new user access right" })
    @ApiBody({ type: AccessRightDto })
    @ApiResponse({ status: 201, description: "Access right created successfully" })
    createAccessRight(@Body() dto: AccessRightDto) {
        return this.settingService.createUserAccessRight(dto);
    }

    @Patch("access-rights/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Update an existing user access right" })
    @ApiParam({ name: "id", type: String, description: "Access Right ID" })
    @ApiBody({ type: AccessRightDto })
    @ApiResponse({ status: 200, description: "Access right updated successfully" })
    updateAccessRight(
        @Param("id") id: string,
        @Body() dto: AccessRightDto
    ) {
        return this.settingService.updateUserAccessRight(id, dto);
    }

    @Post("general")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create or update general setting" })
    @ApiBody({ type: GeneralSettingDto })
    @ApiResponse({ status: 201, description: "General setting created/updated successfully" })
    saveGeneralSetting(@Body() dto: GeneralSettingDto) {
        return this.settingService.saveGeneralSetting(dto);
    }
}
