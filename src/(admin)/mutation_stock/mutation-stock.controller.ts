import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { MutationStockService } from "./mutation-stock.service";
import { MutationStockDto } from "./dtos/mutation-stock.dto";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MutationStockController {
    /**
     * Constructor for MutationStockController.
     * Injects the mutation stock service.
     * @param mutationStockService - The mutation stock service.
     */
    constructor(
        private readonly mutationStockService: MutationStockService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    /**
     * Finds all mutation stock entities.
     * 
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
    /**
     * Finds a mutation stock by id.
     * @param {string} id - The id of the mutation stock to find.
     * @returns {Promise<MutationStockEntity>} The found mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    getById(@Param('id') id: string) {
        return this.mutationStockService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new mutation stock entity.
     *
     * @param {MutationStockDto} dto - The data transfer object containing the new mutation stock information.
     * @returns {Promise<MutationStockEntity>} The newly created mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    create(@Body() dto: MutationStockDto) {
        return this.mutationStockService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing mutation stock entity.
     *
     * @param {string} id - The id of the mutation stock to update.
     * @param {MutationStockDto} dto - The data transfer object containing the updated mutation stock information.
     * @returns {Promise<MutationStockEntity>} The updated mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    update(@Param('id') id: string, @Body() dto: MutationStockDto) {
        return this.mutationStockService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a mutation stock entity by id.
     * @param id - The id of the mutation stock to delete.
     * @returns The deleted mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    delete(@Param('id') id: string) {
        return this.mutationStockService.delete(id);
    }
}