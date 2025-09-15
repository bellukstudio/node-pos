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
    UseGuards,
} from "@nestjs/common";
import { ReturnOfGoodsService } from "./return-goods.service";
import { ReturnGoodsDto } from "./dtos/return-goods.dto";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
    ApiBody,
    ApiBearerAuth,
} from "@nestjs/swagger";

@ApiTags('Return Goods')
@ApiBearerAuth()
@Controller('return-goods')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReturnGoodsController {
    constructor(
        private readonly returnOfGoodsService: ReturnOfGoodsService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: 'Get all return goods', description: 'Retrieve a paginated list of return goods with optional search filters.' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search keyword for filtering by product, supplier, etc.' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved list of return goods.' })
    /**
     * Retrieves a paginated list of return goods with optional search filters.
     * @param {any} queries - The query object containing the page, per_page, and search parameters.
     * @returns {Promise<{data: ReturnOfGoodsEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved return goods with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.returnOfGoodsService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: 'Get return good by ID', description: 'Retrieve a single return good record by its unique ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Return goods ID' })
    @ApiResponse({ status: 200, description: 'Return good found and returned.' })
    @ApiResponse({ status: 404, description: 'Return good not found.' })
    /**
     * Retrieves a return good by its ID.
     * @throws {NotFoundException} If the return good is not found.
     * @returns {Promise<ReturnOfGoodsEntity>} The found return good entity.
     */
    getById(@Param('id') id: string) {
        return this.returnOfGoodsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Create return good', description: 'Create a new return good record.' })
    @ApiBody({ type: ReturnGoodsDto })
    @ApiResponse({ status: 201, description: 'Return good successfully created.' })
    /**
     * Create a new return good record.
     * @param {ReturnGoodsDto} dto - The data transfer object containing the new return good information.
     * @returns {Promise<ReturnOfGoodsEntity>} The newly created return of goods entity.
     */
    create(@Body() dto: ReturnGoodsDto) {
        return this.returnOfGoodsService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Update return good', description: 'Update an existing return good by ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Return goods ID' })
    @ApiBody({ type: ReturnGoodsDto })
    @ApiResponse({ status: 200, description: 'Return good successfully updated.' })
    @ApiResponse({ status: 404, description: 'Return good not found.' })
    /**
     * Updates an existing return of goods.
     * 
     * @param {string} id - The id of the return of goods to update.
     * @param {ReturnGoodsDto} dto - The data transfer object containing the updated return of goods information.
     * @returns {Promise<ReturnOfGoodsEntity>} The updated return of goods entity.
     * @throws {NotFoundException} If the return of goods is not found.
     */
    update(@Param('id') id: string, @Body() dto: ReturnGoodsDto) {
        return this.returnOfGoodsService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete return good', description: 'Soft-delete a return good record by ID.' })
    @ApiParam({ name: 'id', type: String, description: 'Return goods ID' })
    @ApiResponse({ status: 200, description: 'Return good successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Return good not found.' })
    /**
     * Soft-deletes a return good record by ID.
     * @param id - The unique ID of the return good to delete.
     * @returns The deleted return good entity, or a NotFoundException if the return good is not found.
     */
    remove(@Param('id') id: string) {
        return this.returnOfGoodsService.delete(id);
    }
}
