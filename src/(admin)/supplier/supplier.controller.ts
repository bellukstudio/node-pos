import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { Roles } from "../../core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { SupplyManagementDto } from "./dtos/supply-management.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";

@ApiTags("Supplier Management")
@ApiBearerAuth()
@Controller("suppliers")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class SupplierController {
    constructor(private readonly supplierService: SupplierService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get all suppliers with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "PT. Maju Jaya" })
    @ApiResponse({ status: 200, description: "List of suppliers retrieved successfully" })
    /**
     * Retrieves a list of suppliers with pagination and search functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - The search keyword to filter by. Optional.
     * @returns {Promise<{data: SupplierManagementEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved suppliers with pagination and filter functionality.
     */
    getAll(@Query() queries: any) {
        return this.supplierService.getAll(queries);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get a supplier by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Supplier retrieved successfully" })
    /**
     * Retrieves a supplier management entity by its ID.
     *
     * @returns {Promise<SupplyManagementEntity>} The retrieved supplier management entity.
     * @throws {NotFoundException} If the supplier management entity is not found.
     */
    getById(@Param("id") id: string) {
        return this.supplierService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create a new supplier" })
    @ApiBody({ type: SupplyManagementDto })
    @ApiResponse({ status: 201, description: "Supplier created successfully" })
    /**
     * Creates a new supplier management entity.
     * 
     * @param {SupplyManagementDto} dto - The data transfer object containing the new supplier management information.
     * @returns {Promise<SupplierManagementEntity>} The newly created supplier management entity.
     */
    create(@Body() dto: SupplyManagementDto) {
        return this.supplierService.create(dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Update an existing supplier" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiBody({ type: SupplyManagementDto })
    @ApiResponse({ status: 200, description: "Supplier updated successfully" })
    /**
     * Updates an existing supplier management entity.
     * 
     * @param {string} id - The id of the supplier management to update.
     * @param {SupplyManagementDto} dto - The data transfer object containing the updated supplier management information.
     * @returns {Promise<SupplierManagementEntity>} The updated supplier management entity.
     * @throws {NotFoundException} If the supplier management is not found.
     */
    update(@Param("id") id: string, @Body() dto: SupplyManagementDto) {
        return this.supplierService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Delete a supplier (soft delete recommended)" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Supplier deleted successfully" })
    /**
     * Deletes a supplier management entity.
     *
     * @throws {NotFoundException} If the supplier management is not found.
     */
    delete(@Param("id") id: string) {
        return this.supplierService.delete(id);
    }
}
