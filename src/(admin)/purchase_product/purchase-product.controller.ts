import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus,
    Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { PurchaseProductService } from "./purchase-product.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { PurchaseProductDto } from "./dtos/purchase-product.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody,
    ApiBearerAuth
} from "@nestjs/swagger";

@ApiTags('Purchase Products')
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PurchaseProductController {
    constructor(
        private readonly purchaseProductService: PurchaseProductService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Get all purchase products with pagination & search' })
    @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number (default: 1)' })
    @ApiQuery({ name: 'per_page', required: false, type: Number, description: 'Items per page (default: 10)' })
    @ApiQuery({ name: 'search', required: false, type: String, description: 'Search by branch name or supplier name' })
    @ApiResponse({ status: 200, description: 'List of purchase products retrieved successfully' })
    /**
     * Finds all purchase product entities.
     */
    getAll(@Query() queries: any) {
        return this.purchaseProductService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: 'Get purchase product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Purchase product ID' })
    @ApiResponse({ status: 200, description: 'Purchase product found' })
    @ApiResponse({ status: 404, description: 'Purchase product not found' })
    /**
     * Finds a purchase product by id.
     */
    getById(@Param('id') id: string) {
        return this.purchaseProductService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Create new purchase product' })
    @ApiBody({ type: PurchaseProductDto })
    @ApiResponse({ status: 201, description: 'Purchase product created successfully' })
    @ApiResponse({ status: 400, description: 'Validation error' })
    create(@Body() dto: PurchaseProductDto) {
        return this.purchaseProductService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Update purchase product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Purchase product ID' })
    @ApiBody({ type: PurchaseProductDto })
    @ApiResponse({ status: 200, description: 'Purchase product updated successfully' })
    @ApiResponse({ status: 404, description: 'Purchase product not found' })
    update(@Param('id') id: string, @Body() dto: PurchaseProductDto) {
        return this.purchaseProductService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: 'Delete purchase product by ID' })
    @ApiParam({ name: 'id', type: String, description: 'Purchase product ID' })
    @ApiResponse({ status: 200, description: 'Purchase product deleted successfully (soft delete)' })
    @ApiResponse({ status: 404, description: 'Purchase product not found' })
    delete(@Param('id') id: string) {
        return this.purchaseProductService.delete(id);
    }
}
