import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { DetailPurchaseService } from "./detail-purchase.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { DetailPurchaseDto } from "./dtos/detail_purchase.dto";

@Controller('detail-purchase')
export class DetailPurchaseController {
    constructor(
        private readonly detailPurchaseService: DetailPurchaseService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds all detail purchase entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the detail purchase by. Can be used to search for the purchase name or product name.
     * @returns An object with the following properties:
     *   - data: An array of DetailPurchaseEntity objects.
     *   - total: The total number of detail purchase.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */

    getAll(@Query() queries: any) {
        return this.detailPurchaseService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds a detail purchase by id.
     *
     * @param {string} id - The id of the detail purchase to find.
     * @returns {Promise<DetailPurchaseEntity>} The found detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    getById(@Param('id') id: string) {
        return this.detailPurchaseService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new detail purchase.
     * 
     * @param {DetailPurchaseDto} dto - The data transfer object containing the new detail purchase information.
     * @returns {Promise<DetailPurchaseEntity>} The newly created detail purchase entity.
     */
    create(@Body() dto: DetailPurchaseDto) {
        return this.detailPurchaseService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing detail purchase.
     * 
     * @param {string} id - The id of the detail purchase to update.
     * @param {DetailPurchaseDto} dto - The data transfer object containing the updated detail purchase information.
     * @returns {Promise<DetailPurchaseEntity>} The updated detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    update(@Param('id') id: string, @Body() dto: DetailPurchaseDto) {
        return this.detailPurchaseService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a detail purchase by id.
     * 
     * @param {string} id - The id of the detail purchase to delete.
     * @returns {Promise<void>} The deleted detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    delete(@Param('id') id: string) {
        return this.detailPurchaseService.delete(id);
    }
}