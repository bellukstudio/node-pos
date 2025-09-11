import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { Roles } from '../../core/decorators/role.decorator';
import { Role } from "src/core/enum/role.enum";
import { SupplierDto } from "./dtos/supplier.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class SupplierController {
    /**
     * The constructor for the SupplierController.
     * @param supplierService - The injected SupplierService.
     */
    constructor(
        private readonly supplierService: SupplierService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Retrieves a list of suppliers.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the suppliers by. Can be used to search for the supplier name.
     * @returns An object with the following properties:
     *   - data: An array of SupplierEntity objects.
     *   - total: The total number of suppliers.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.supplierService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds a supplier by id.
     * 
     * @param {string} id - The id of the supplier to find.
     * @returns {Promise<SupplierEntity>} The found supplier entity.
     * @throws {NotFoundException} If the supplier is not found.
     */
    getById(@Param('id') id: string) {
        return this.supplierService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new supplier.
     * 
     * @param {SupplierDto} dto - The data transfer object containing the new supplier information.
     * @returns {Promise<SupplierEntity>} The newly created supplier entity.
     */
    create(@Body() dto: SupplierDto) {
        return this.supplierService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing supplier.
     * 
     * @param {string} id - The id of the supplier to update.
     * @param {SupplierDto} dto - The data transfer object containing the updated supplier information.
     * @returns {Promise<SupplierEntity>} The updated supplier entity.
     * @throws {NotFoundException} If the supplier is not found.
     */
    update(@Param('id') id: string, @Body() dto: SupplierDto) {
        return this.supplierService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a supplier.
     * 
     * @param {string} id - The id of the supplier to delete.
     * @returns {Promise<void>} A promise that resolves when the supplier has been deleted.
     * @throws {NotFoundException} If the supplier is not found.
     */
    delete(@Param('id') id: string) {
        return this.supplierService.delete(id);
    }
}   