import { 
    Body, Controller, Delete, Get, HttpCode, HttpStatus, 
    Param, Post, Put, Query, UseGuards 
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ProductService } from "./product.service";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { ProductDto } from "./dtos/product.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductController {

    /**
     * Inject ProductService into the controller
     * 
     * @param productService - ProductService
     */
    constructor(
        private readonly productService: ProductService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Retrieve all products with pagination & search' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number, defaults to 1' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page, defaults to 10' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by product name' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved products list' })
    /**
     * Finds all product entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the products by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of ProductEntity objects.
     *   - total: The total number of products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.productService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Retrieve a single product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product found' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    /**
     * Finds a product by id.
     * 
     * @param {string} id - The id of the product to find.
     * @returns {Promise<ProductEntity>} The found product entity.
     * @throws {NotFoundException} If the product is not found.
     */
    getById(@Param('id') id: string) {
        return this.productService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product successfully created' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    /**
     * Creates a new product.
     * 
     * @param {ProductDto} dto - The data transfer object containing the new product information.
     * @returns {Promise<ProductEntity>} The newly created product entity.
     */
    create(@Body() dto: ProductDto) {
        return this.productService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Update a product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product successfully updated' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    /**
     * Updates an existing product.
     * 
     * @param {string} id - The id of the product to update.
     * @param {ProductDto} dto - The data transfer object containing the updated product information.
     * @returns {Promise<ProductEntity>} The updated product entity.
     * @throws {NotFoundException} If the product is not found.
     */
    update(@Param('id') id: string, @Body() dto: ProductDto) {
        return this.productService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Product ID' })
    @ApiResponse({ status: 200, description: 'Product successfully deleted' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    /**
     * Deletes a product by id.
     * 
     * @param {string} id - The id of the product to delete.
     * @returns {Promise<void>} A promise that resolves when the product has been deleted.
     * @throws {NotFoundException} If the product is not found.
     */
    delete(@Param('id') id: string) {
        return this.productService.delete(id);
    }

}
