import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PurchaseProductService } from "./purchase-product.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { PurchaseProductDto } from "./dtos/purchase-product.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PurchaseProductController {

    constructor(
        private readonly purchaseProductService: PurchaseProductService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds all purchase product entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the purchase products by. Can be used to search for the branch name or supplier name.
     * @returns An object with the following properties:
     *   - data: An array of PurchaseProductEntity objects.
     *   - total: The total number of purchase products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.purchaseProductService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds a purchase product by id.
     *
     * @param {string} id - The id of the purchase product to find.
     * @returns {Promise<PurchaseProductEntity>} The found purchase product entity.
     * @throws {NotFoundException} If the purchase product is not found.
     */
    getById(@Param('id') id: string) {
        return this.purchaseProductService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    create(@Body() dto: PurchaseProductDto) {
        return this.purchaseProductService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    update(@Param('id') id: string, @Body() dto: PurchaseProductDto) {
        return this.purchaseProductService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    delete(@Param('id') id: string) {
        return this.purchaseProductService.delete(id);
    }
}