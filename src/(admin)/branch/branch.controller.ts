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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { BranchService } from './branch.service';
import { BranchDto } from './dtos/branch.dto';
import { Role } from 'src/core/enum/role.enum';
import { Roles } from 'src/core/decorators/role.decorator';
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiQuery,
    ApiBody,
} from '@nestjs/swagger';
import { BranchEntity } from 'src/databases/entities/branch/branch.entity';

@ApiTags('Branches')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BranchController {
    constructor(private readonly branchService: BranchService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Get all branches with pagination & search' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'per_page', required: false, type: Number, example: 10 })
    @ApiQuery({
        name: 'search',
        required: false,
        type: String,
        description: 'Search by branch name, address, or city',
    })
    @ApiResponse({
        status: 200,
        description: 'List of branches',
        type: [BranchEntity],
    })
    /**
     * Retrieves a list of branches with pagination and search functionality.
     * 
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - A search query to filter the branches by. Can be used to search for the branch name, address, or city.
     * @returns {Promise<{data: BranchEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved branches with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.branchService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Get a branch by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({
        status: 200,
        description: 'Branch found',
        type: BranchEntity,
    })
    @ApiResponse({ status: 404, description: 'Branch not found' })
    /**
     * Gets a branch by ID.
     *
     * @summary Get a branch by ID
     * @description Gets a branch by ID
     * @param {string} id - The ID of the branch to get
     * @returns {Promise<BranchEntity>} The branch entity
     * @throws {NotFoundException} If the branch is not found
     */
    getById(@Param('id') id: string) {
        return this.branchService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Create a new branch' })
    @ApiBody({ type: BranchDto })
    @ApiResponse({
        status: 201,
        description: 'Branch created successfully',
        type: BranchEntity,
    })
    /**
     * Creates a new branch.
     *
     * @summary Create a new branch
     * @description Create a new branch with the given information
     * @param {BranchDto} dto - The data transfer object containing the new branch information
     * @returns {Promise<BranchEntity>} The newly created branch entity
     * @throws {NotFoundException} If the branch is not found
     */
    create(@Body() dto: BranchDto) {
        return this.branchService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Update a branch by ID' })
    @ApiParam({ name: 'id', type: String })
    @ApiBody({ type: BranchDto })
    @ApiResponse({
        status: 200,
        description: 'Branch updated successfully',
        type: BranchEntity,
    })
    @ApiResponse({ status: 404, description: 'Branch not found' })
    /**
     * Updates a branch by ID.
     *
     * @summary Update a branch
     * @description Updates a branch by ID
     * @param {string} id - The id of the branch to update
     * @param {BranchDto} dto - The data transfer object containing the updated branch information
     * @returns {Promise<BranchEntity>} The updated branch entity
     * @throws {NotFoundException} If the branch is not found
     */
    update(@Param('id') id: string, @Body() dto: BranchDto) {
        return this.branchService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete a branch by ID (soft delete if implemented)' })
    @ApiParam({ name: 'id', type: String })
    @ApiResponse({ status: 200, description: 'Branch deleted successfully' })
    @ApiResponse({ status: 404, description: 'Branch not found' })
    /**
     * Deletes a branch by id.
     *
     * @summary Delete a branch
     * @description Delete a branch by id (soft delete if implemented)
     * @param {string} id - The id of the branch to delete
     * @returns {Promise<void>} A promise that resolves when the branch has been deleted
     * @throws {NotFoundException} If the branch is not found
     */
    delete(@Param('id') id: string) {
        return this.branchService.delete(id);
    }
}
