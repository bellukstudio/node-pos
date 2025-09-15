import {
    Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { ShiftService } from "./shift.service";
import { ShiftDto } from "./dtos/shift.dto";
import { ShiftActivityLogDto } from "./dtos/log-shift.dto";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Shift Management")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class ShiftController {
    constructor(private readonly shiftService: ShiftService) { }

    @Get("shifts")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Get all shifts (with pagination and search)" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "Morning" })
    @ApiResponse({ status: 200, description: "List of shifts retrieved successfully" })
    /**
     * Retrieves a list of shifts with pagination and filter functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - The search keyword to filter by. Optional.
     * @returns {Promise<{data: ShiftEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved shifts with pagination and filter functionality.
    **/
    getAll(@Query() queries: any) {
        return this.shiftService.getAll(queries);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Get a shift by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Shift retrieved successfully" })
    /**
     * Retrieves a shift by its ID.
     *
     * @param id The ID of the shift to retrieve.
     * @returns The retrieved shift.
     * @throws {NotFoundException} If the shift is not found.
     */
    getById(@Param("id") id: string) {
        return this.shiftService.getById(id);
    }

    @Post("open")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    @ApiOperation({ summary: "Open a new shift" })
    @ApiResponse({ status: 201, description: "Shift opened successfully" })
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

    @Put("close/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    @ApiOperation({ summary: "Close a shift" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Shift closed successfully" })
    /**
     * Closes a shift and records the closing details.
     *
     * @param id The ID of the shift to close.
     * @param dto The data transfer object containing the updated shift information.
     * @returns The updated shift entity.
     * @throws {NotFoundException} If the shift is not found.
     */
    closeShift(@Param("id") id: string, @Body() dto: ShiftDto) {
        return this.shiftService.closeShift(id, dto);
    }

    @Get("log-shifts")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    @ApiOperation({ summary: "Get all shift activity logs (with pagination and filters)" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "shift_id", required: false, type: String, example: "uuid-123" })
    @ApiQuery({ name: "activity_type", required: false, type: String, example: "OPEN" })
    @ApiResponse({ status: 200, description: "List of shift logs retrieved successfully" })
    /**
     * Retrieves a list of shift activity logs with pagination and filter functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} shift_id - The shift ID to filter by. Optional.
     * @property {string} activity_type - The activity type to filter by. Optional.
     * @returns {Promise<{data: ShiftActivityLogEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved shift activity logs with pagination and filter functionality.
     */
    getAllLog(@Query() queries: any) {
        return this.shiftService.getAllLog(queries);
    }

    @Get("log-shift/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    @ApiOperation({ summary: "Get a shift activity log by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Shift log retrieved successfully" })
    /**
     * Retrieves a shift activity log by its ID.
     * @param id - The ID of the shift activity log to retrieve.
     * @returns {Promise<ShiftActivityLogEntity>} The retrieved shift activity log.
     * @throws {NotFoundException} If the shift activity log is not found.
     */
    getByIdLog(@Param("id") id: string) {
        return this.shiftService.getByIdLog(id);
    }

    @Post("log-shift/create")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Cashier)
    @ApiOperation({ summary: "Create a new shift activity log" })
    @ApiResponse({ status: 201, description: "Shift log created successfully" })
    /**
     * Creates a new shift activity log.
     * @param dto - The data transfer object containing the new shift activity log information.
     * @returns {Promise<ShiftActivityLogEntity>} The newly created shift activity log.
     * @throws {NotFoundException} If the shift is not found.
     */
    create(@Body() dto: ShiftActivityLogDto) {
        return this.shiftService.createLog(dto);
    }
}
