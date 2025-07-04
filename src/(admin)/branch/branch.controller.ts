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
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guard/role.guard';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dtos/create-branch.dto';
import { UpdateBranchDto } from './dtos/update-branch.dto';
import { Role } from 'src/core/enum/role.enum';
import { Roles } from 'src/core/decorators/role.decorator';

@Controller('branch')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Finds all branches.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the branches by. Can be used to search for the branch name, address, or city.
     * @returns An object with the following properties:
     *   - data: An array of BranchEntity objects.
     *   - total: The total number of branches.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.branchService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Finds a branch by id.
     *
     * @param {string} id - The id of the branch to find.
     * @returns {Promise<BranchEntity>} The found branch entity.
     * @throws {NotFoundException} If the branch is not found.
     */
    getById(@Param('id') id: string) {
        return this.branchService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    /**
     * Creates a new branch.
     *
     * @param {CreateBranchDto} dto - The data transfer object containing the new branch information.
     * @returns {Promise<BranchEntity>} The newly created branch entity.
     */
    create(@Body() dto: CreateBranchDto) {
        return this.branchService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Updates an existing branch.
     *
     * @param {string} id - The id of the branch to update.
     * @param {UpdateBranchDto} dto - The data transfer object containing the updated branch information.
     * @returns {Promise<BranchEntity>} The updated branch entity.
     * @throws {NotFoundException} If the branch is not found.
     */
    update(
        @Param('id') id: string,
        @Body() dto: UpdateBranchDto
    ) {
        return this.branchService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Deletes a branch.
     *
     * @param {string} id - The id of the branch to delete.
     * @returns {Promise<void>} A promise that resolves when the branch has been deleted.
     * @throws {NotFoundException} If the branch is not found.
     */
    delete(@Param('id') id: string) {
        return this.branchService.delete(id);
    }
}
