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
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { CategoryProductService } from "./category-product.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { CategoryProductDto } from "./dto/category-product.dto";
import {
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    ApiQuery,
    ApiParam,
    ApiBody,
    ApiResponse,
} from "@nestjs/swagger";
import { CategoryProductEntity } from "src/databases/entities/product/category-product.entity";

@ApiTags("Category Products")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class CategoryProductController {
    constructor(
        private readonly categoryProductService: CategoryProductService
    ) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get all category products with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({
        name: "search",
        required: false,
        type: String,
        description: "Search by category product name",
    })
    @ApiResponse({
        status: 200,
        description: "List of category products",
        type: [CategoryProductEntity],
    })
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

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get a category product by ID" })
    @ApiParam({ name: "id", type: String })
    @ApiResponse({
        status: 200,
        description: "Category product found",
        type: CategoryProductEntity,
    })
    @ApiResponse({ status: 404, description: "Category product not found" })
    /**
     * Finds a category product by id.
     * 
     * @param id - The id of the category product to find.
     * @returns A promise that resolves when the category product has been found.
     * @throws {NotFoundException} If the category product is not found.
     */
    getById(@Param("id") id: string) {
        return this.categoryProductService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create a new category product" })
    @ApiBody({ type: CategoryProductDto })
    @ApiResponse({
        status: 201,
        description: "Category product created successfully",
        type: CategoryProductEntity,
    })
    /**
     * Create a new category product.
     *
     * @remarks
     * The category product name must be unique.
     * The category product description is optional.
     * The category product status is optional and defaults to true.
     *
     * @throws {BadRequestException} If the category product name is not unique.
     * @throws {NotFoundException} If the category product is not found.
     */
    create(@Body() dto: CategoryProductDto) {
        return this.categoryProductService.create(dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Update a category product by ID" })
    @ApiParam({ name: "id", type: String })
    @ApiBody({ type: CategoryProductDto })
    @ApiResponse({
        status: 200,
        description: "Category product updated successfully",
        type: CategoryProductEntity,
    })
    @ApiResponse({ status: 404, description: "Category product not found" })
    /**
     * Updates an existing category product.
     * 
     * @param id - The id of the category product to update.
     * @param dto - The data transfer object containing the updated category product information.
     * @returns A promise that resolves when the category product has been updated.
     * @throws {NotFoundException} If the category product is not found.
     */
    update(@Param("id") id: string, @Body() dto: CategoryProductDto) {
        return this.categoryProductService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Delete a category product by ID" })
    @ApiParam({ name: "id", type: String })
    @ApiResponse({ status: 200, description: "Category product deleted successfully" })
    @ApiResponse({ status: 404, description: "Category product not found" })
    /**
     * Deletes a category product by id.
     * 
     * @param id - The id of the category product to delete.
     * @returns A promise that resolves when the category product has been deleted.
     * @throws {NotFoundException} If the category product is not found.
     */
    delete(@Param("id") id: string) {
        return this.categoryProductService.delete(id);
    }
}
