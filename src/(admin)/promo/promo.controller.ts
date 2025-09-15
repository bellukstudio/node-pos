import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { PromoService } from "./promo.service";
import { PromoDto } from "./dtos/promo.dto";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Promo')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PromoController {
    constructor(
        private readonly discountService: PromoService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Get all promos', description: 'Retrieve a paginated list of promos with optional search filter.' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search keyword for promo name/description' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved list of promos.' })
    /**
     * Retrieves a paginated list of promos with optional search filter.
     * @returns A paginated list of promos with optional search filter.
     */
    getAll(@Query() queries: any) {
        return this.discountService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Get promo by ID', description: 'Retrieve a specific promo by its unique ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Promo ID' })
    @ApiResponse({ status: 200, description: 'Promo found and returned.' })
    @ApiResponse({ status: 404, description: 'Promo not found.' })
    /**
     * Retrieves a promo by its unique ID.
     *
     * @param id - The ID of the promo to retrieve.
     * @returns The retrieved promo entity.
     * @throws {NotFoundException} If the promo is not found.
     */
    getById(@Param('id') id: string) {
        return this.discountService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: 'Create promo', description: 'Create a new promo.' })
    @ApiBody({ type: PromoDto })
    @ApiResponse({ status: 201, description: 'Promo successfully created.' })
    /**
     * Creates a new promo.
     * @param dto - The data transfer object containing the new promo information.
     * @returns The newly created promo entity.
     * @throws {NotFoundException} If the promo is not found.
     */
    create(@Body() dto: PromoDto) {
        return this.discountService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager)
    @ApiOperation({ summary: 'Update promo', description: 'Update an existing promo by ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Promo ID' })
    @ApiBody({ type: PromoDto })
    @ApiResponse({ status: 200, description: 'Promo successfully updated.' })
    @ApiResponse({ status: 404, description: 'Promo not found.' })
    /**
     * Updates an existing promo.
     * 
     * @param id - The ID of the promo to update.
     * @param dto - The data transfer object containing the updated promo information.
     * @returns A promise that resolves when the promo has been updated.
     * @throws {NotFoundException} If the promo is not found.
     */
    update(@Param('id') id: string, @Body() dto: PromoDto) {
        return this.discountService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete promo', description: 'Delete a promo by its unique ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Promo ID' })
    @ApiResponse({ status: 200, description: 'Promo successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Promo not found.' })
    /**
     * Deletes a promo by its unique ID.
     * 
     * @param id - The ID of the promo to delete.
     * @returns A promise that resolves when the promo has been deleted.
     * @throws {NotFoundException} If the promo is not found.
     */
    delete(@Param('id') id: string) {
        return this.discountService.delete(id);
    }
}
