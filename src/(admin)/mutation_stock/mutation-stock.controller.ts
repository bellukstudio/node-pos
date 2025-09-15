import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus,
    Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { MutationStockService } from "./mutation-stock.service";
import { MutationStockDto } from "./dtos/mutation-stock.dto";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Mutation Stock')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MutationStockController {
    constructor(
        private readonly mutationStockService: MutationStockService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: 'Get all mutation stock records' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number, default 1' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page, default 10' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by product name' })
    @ApiResponse({ status: 200, description: 'List of mutation stock records' })
    /**
     * Retrieves all mutation stock records.
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the mutation stocks by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of MutationStockEntity objects.
     *   - total: The total number of mutation stocks.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.mutationStockService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: 'Get a mutation stock record by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Mutation stock ID' })
    @ApiResponse({ status: 200, description: 'Mutation stock record found' })
    @ApiResponse({ status: 404, description: 'Mutation stock not found' })
    /**
     * Retrieves a mutation stock record by ID.
     * @throws {NotFoundException} If the mutation stock is not found.
     * @returns The found mutation stock record.
     */
    getById(@Param('id') id: string) {
        return this.mutationStockService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Create a new mutation stock record' })
    @ApiResponse({ status: 201, description: 'Mutation stock record created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    /**
     * Creates a new mutation stock record.
     * @param dto - The data transfer object containing the new mutation stock information.
     * @returns {Promise<MutationStockEntity>} The newly created mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    create(@Body() dto: MutationStockDto) {
        return this.mutationStockService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Update a mutation stock record' })
    @ApiParam({ name: 'id', type: String, description: 'Mutation stock ID' })
    @ApiResponse({ status: 200, description: 'Mutation stock record updated successfully' })
    @ApiResponse({ status: 404, description: 'Mutation stock not found' })
    /**
     * Updates an existing mutation stock record.
     * 
     * @param id - The ID of the mutation stock to update.
     * @param dto - The data transfer object containing the updated mutation stock information.
     * @returns {Promise<MutationStockEntity>} The updated mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    update(@Param('id') id: string, @Body() dto: MutationStockDto) {
        return this.mutationStockService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete a mutation stock record' })
    @ApiParam({ name: 'id', type: String, description: 'Mutation stock ID' })
    @ApiResponse({ status: 200, description: 'Mutation stock record deleted successfully' })
    @ApiResponse({ status: 404, description: 'Mutation stock not found' })
    /**
     * Deletes a mutation stock record by ID.
     * 
     * @param {string} id - The ID of the mutation stock to delete.
     * @returns {Promise<void>} The deleted mutation stock record.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    delete(@Param('id') id: string) {
        return this.mutationStockService.delete(id);
    }
}
