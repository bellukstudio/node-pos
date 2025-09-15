import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Param, 
    Post, 
    Put, 
    Query, 
    UseGuards 
} from "@nestjs/common";
import { LoyaltyService } from "./loyalty.service";
import { LoyaltyDto } from "./dtos/loyalty.dto";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('Loyalty')
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class LoyaltyController {
    /**
     * Constructor for LoyaltyController.
     * @param {LoyaltyService} loyaltyService - a service for handling loyalty operations.
     */
    constructor(
        private readonly loyaltyService: LoyaltyService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Cashier, Role.Supervisor)
    @ApiOperation({ summary: 'Retrieve all points loyalty records (with pagination & search)' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by member name or description' })
    @ApiResponse({ status: 200, description: 'List of points loyalty records successfully retrieved.' })
    /**
     * Retrieves a list of points loyalty records with pagination and search functionality.
     * @param queries - An object containing the query parameters.
     * @returns {Promise<{data: PointsLoyaltyEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved points loyalty records with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.loyaltyService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Cashier, Role.Supervisor)
    @ApiOperation({ summary: 'Retrieve a points loyalty record by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Points loyalty ID' })
    @ApiResponse({ status: 200, description: 'Points loyalty record retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Points loyalty record not found.' })
    /**
     * Retrieves a points loyalty record by its id.
     * @param id - The id of the points loyalty record to retrieve.
     * @returns {Promise<PointsLoyaltyEntity>} The retrieved points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    getById(@Param('id') id: string) {
        return this.loyaltyService.getById(id);
    }

    @Get('member/:idMember')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Cashier, Role.Supervisor)
    @ApiOperation({ summary: 'Retrieve a points loyalty record by Member ID' })
    @ApiParam({ name: 'idMember', type: String, description: 'Member ID' })
    @ApiResponse({ status: 200, description: 'Points loyalty record retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Points loyalty record not found for the given member.' })
    /**
     * Retrieves a points loyalty record by its member id.
     * @param idMember - The id of the member to retrieve the points loyalty record for.
     * @returns {Promise<PointsLoyaltyEntity>} The retrieved points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    getByMember(@Param('idMember') idMember: string) {
        return this.loyaltyService.getByMember(idMember);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Cashier, Role.Supervisor)
    @ApiOperation({ summary: 'Create a new points loyalty record' })
    @ApiResponse({ status: 201, description: 'Points loyalty record created successfully.' })
    /**
     * Creates a new points loyalty record.
     * @param dto - The data transfer object containing the new points loyalty information.
     * @returns {Promise<PointsLoyaltyEntity>} The newly created points loyalty record.
     */
    create(@Body() dto: LoyaltyDto) {
        return this.loyaltyService.savePoint(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Cashier, Role.Supervisor)
    @ApiOperation({ summary: 'Update an existing points loyalty record' })
    @ApiParam({ name: 'id', type: String, description: 'Points loyalty ID' })
    @ApiResponse({ status: 200, description: 'Points loyalty record updated successfully.' })
    @ApiResponse({ status: 404, description: 'Points loyalty record not found.' })
    /**
     * Updates an existing points loyalty record.
     * @param id - The id of the points loyalty record to update.
     * @param dto - The data transfer object containing the updated points loyalty information.
     * @returns {Promise<PointsLoyaltyEntity>} The updated points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    update(@Param('id') id: string, @Body() dto: LoyaltyDto) {
        return this.loyaltyService.updatePoint(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete a points loyalty record by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Points loyalty ID' })
    @ApiResponse({ status: 200, description: 'Points loyalty record deleted successfully.' })
    @ApiResponse({ status: 404, description: 'Points loyalty record not found.' })
    /**
     * Deletes a points loyalty record by its id.
     * @param id - The id of the points loyalty record to delete.
     * @returns {Promise<void>} A promise that resolves when the points loyalty record has been deleted.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    delete(@Param('id') id: string) {
        return this.loyaltyService.delete(id);
    }
}
