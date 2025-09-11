import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ReturnOfGoodsService } from "./return-goods.service";
import { ReturnGoodsDto } from "./dtos/return-goods.dto";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ReturnGoodsController {

    /**
     * Injects the return of goods service.
     * @param returnOfGoodsService - The return of goods service.
     */
    constructor(
        private readonly returnOfGoodsService: ReturnOfGoodsService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    /**
     * Finds all return of goods entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the return of goods by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of ReturnOfGoodsEntity objects.
     *   - total: The total number of return of goods.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.returnOfGoodsService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    /**
     * Finds a return of goods by id.
     * 
     * @param {string} id - The id of the return of goods to find.
     * @returns {Promise<ReturnOfGoodsEntity>} The return of goods entity if found, otherwise a NotFoundException is thrown.
     */
    getById(@Param('id') id: string) {
        return this.returnOfGoodsService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new return of goods.
     * 
     * @param {ReturnGoodsDto} dto - The data transfer object containing the new return of goods information.
     * @returns {Promise<ReturnOfGoodsEntity>} The newly created return of goods entity.
     */
    create(@Body() dto: ReturnGoodsDto) {
        return this.returnOfGoodsService.create(dto);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
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
    /**
     * Deletes a return of goods by id.
     * 
     * @param {string} id - The id of the return of goods to delete.
     * @returns {Promise<void>} The result of the deletion operation.
     * @throws {NotFoundException} If the return of goods is not found.
     */
    delete(@Param('id') id: string) {
        return this.returnOfGoodsService.delete(id);
    }
}