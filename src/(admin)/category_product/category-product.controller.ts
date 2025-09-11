import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { CategoryProductService } from "./category-product.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { CategoryProductDto } from "./dto/category-product.dto";


@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class CategoryProductController {

    /**
     * The constructor for the CategoryProductController.
     * @param categoryProductService The injected CategoryProductService.
     */
    constructor(
        private readonly categoryProductService: CategoryProductService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds all category product entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the category products by. Can be used to search for the category product name.
     * @returns An object with the following properties:
     *   - data: An array of CategoryProductEntity objects.
     *   - total: The total number of category products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.categoryProductService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds a category product by id.
     *
     * @param {string} id - The id of the category product to find.
     * @returns {Promise<CategoryProductEntity>} The found category product entity.
     * @throws {NotFoundException} If the category product is not found.
     */
    getById(@Param('id') id: string) {
        return this.categoryProductService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new category product.
     *
     * @param {CategoryProductDto} dto - The data transfer object containing the new category product information.
     * @returns {Promise<CategoryProductEntity>} The newly created category product entity.
     */
    create(@Body() dto: CategoryProductDto) {
        return this.categoryProductService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing category product.
     *
     * @param {string} id - The id of the category product to update.
     * @param {CategoryProductDto} dto - The data transfer object containing the updated category product information.
     * @returns {Promise<CategoryProductEntity>} The updated category product entity.
     * @throws {NotFoundException} If the category product is not found.
     */
    update(@Param('id') id: string, @Body() dto: CategoryProductDto) {
        return this.categoryProductService.update(id, dto);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a category product by id.
     *
     * @param {string} id - The id of the category product to delete.
     * @returns {Promise<void>} A promise that resolves when the category product has been deleted.
     * @throws {NotFoundException} If the category product is not found.
     */
    delete(@Param('id') id: string) {
        return this.categoryProductService.delete(id);
    }
}