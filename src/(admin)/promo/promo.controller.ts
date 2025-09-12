import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { PromoService } from "./promo.service";
import { PromoDto } from "./dtos/promo.dto";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";


@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PromoController {
    /**
     * Constructor for PromoController
     * 
     * @param discountService - The service for managing discounts
     */
    constructor(
        private readonly discountService: PromoService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Retrieves a list of promos with pagination and search functionality.
     * 
     * @param queries - The query object containing the page, per_page, and search parameters.
     * @returns {Promise<{data: DiscountNpromoEntity[], total: number, page: number, per_page: number, total_pages: number}>}
     */
    getAll(@Query() queries: any) {
        return this.discountService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Retrieves a promo by id.
     * 
     * @param {string} id - The id of the promo to retrieve.
     * @returns {Promise<PromoEntity>} The retrieved promo entity if found, otherwise a NotFoundException is thrown.
     * @throws {NotFoundException} If the promo is not found.
     */
    getById(@Param('id') id: string) {
        return this.discountService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    /**
     * Creates a new promo.
     * 
     * @param {PromoDto} dto - The data transfer object containing the new promo information.
     * @returns {Promise<PromoEntity>} The newly created promo entity.
     */
    create(@Body() dto: PromoDto) {
        return this.discountService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager)
    /**
     * Updates a promo by id.
     * 
     * @param id - The id of the promo to update.
     * @param dto - The data transfer object containing the updated promo information.
     * @returns The updated promo entity.
     * @throws {NotFoundException} If the promo is not found.
     */
    update(@Param('id') id: string, @Body() dto: PromoDto) {
        return this.discountService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a promo by id.
     * 
     * @param id - The id of the promo to delete.
     * @returns The deleted promo entity.
     * @throws {NotFoundException} If the promo is not found.
     */
    delete(@Param('id') id: string) {
        return this.discountService.delete(id);
    }

}