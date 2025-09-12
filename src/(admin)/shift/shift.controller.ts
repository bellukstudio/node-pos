import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { ShiftService } from "./shift.service";
import { ShiftDto } from "./dtos/shift.dto";
import { ShiftActivityLogDto } from "./dtos/log-shift.dto";

@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class ShiftController {
    constructor(private readonly shiftService: ShiftService) { }

    @Get('shifts')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Retrieves a list of shifts with pagination and search functionality.
     * 
     * @param queries - The query object containing the page, per_page, and search parameters.
     * @returns {Promise<{data: ShiftEntity[], total: number, page: number, per_page: number, total_pages: number}>}
     */
    getAll(@Query() queries: any) {
        return this.shiftService.getAll(queries);
    }

    @Get("shift/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Retrieves a shift by its ID.
     * 
     * @param id - The ID of the shift to retrieve.
     * @returns {Promise<ShiftEntity>} The retrieved shift entity.
     * @throws {NotFoundException} If the shift is not found.
     */
    getById(@Param("id") id: string) {
        return this.shiftService.getById(id);
    }

    @Post("shitf/open")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    /**
     * Opens a new shift for a branch and cashier.
     * 
     * @param dto - The data transfer object containing the new shift information.
     * @returns {Promise<ShiftEntity>} The newly created shift entity.
     * @throws {NotFoundException} If the branch or cashier is not found.
     */
    openShift(@Body() dto: ShiftDto) {
        return this.shiftService.openShift(dto);
    }

    @Put("shift/close/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    /**
     * Closes an existing shift.
     * 
     * @param id - The id of the shift to close.
     * @param dto - The data transfer object containing the updated shift information.
     * @returns {Promise<ShiftEntity>} The updated shift entity.
     * @throws {NotFoundException} If the shift is not found.
     */
    closeShift(@Param("id") id: string, @Body() dto: ShiftDto) {
        return this.shiftService.closeShift(id, dto);
    }

    @Get('log-shifts')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    /**
     * Retrieves a list of shift activity logs with pagination and filter functionality.
     * 
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} shift_id - The shift ID to filter by. Optional.
     * @property {string} activity_type - The activity type to filter by. Optional.
     * @returns {Promise<{data: ShiftActivityLogEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved shift activity logs with pagination and filter functionality.
    **/
    getAllLog(@Query() queries: any) {
        return this.shiftService.getAllLog(queries);
    }

    @Get("/log-shift/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    /**
     * Retrieves a shift activity log by its ID.
     * 
     * @param id - The ID of the shift activity log to retrieve.
     * @returns {Promise<ShiftActivityLogEntity>} The retrieved shift activity log.
     * @throws {NotFoundException} If the shift activity log is not found.
     */
    getByIdLog(@Param("id") id: string) {
        return this.shiftService.getByIdLog(id);
    }

    @Post('log-shift/create')
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    /**
     * Creates a new shift activity log.
     *
     * @param dto - The data transfer object containing the new shift activity log information.
     * @returns {Promise<ShiftActivityLogEntity>} The newly created shift activity log.
     * @throws {NotFoundException} If the shift is not found.
     */
    create(@Body() dto: ShiftActivityLogDto) {
        return this.shiftService.createLog(dto);
    }
}
