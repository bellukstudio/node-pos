import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { TransactionDetailService } from "./transaction_detail.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { SalesDetailDto } from "./dtos/sales-detail.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from "@nestjs/swagger";

@ApiTags("Transaction Details")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class TransactionDetailController {
    /**
     * Constructor
     *
     * @param transactionDetailService - The injected TransactionDetailService
     */
    constructor(private readonly transactionDetailService: TransactionDetailService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get all transaction details with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "ITEM-123" })
    @ApiResponse({ status: 200, description: "List of transaction details retrieved successfully" })
    /**
     * Retrieves a list of transaction details with pagination and search functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - A search query to filter the transaction details by. Can be used to search for the transaction detail name.
     * @returns {Promise<{data: TransactionDetailEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved transaction details with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.transactionDetailService.getAll(queries);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get transaction detail by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Transaction detail retrieved successfully" })
    /**
     * Retrieves a transaction detail by its ID.
     *
     * @param id - The ID of the transaction detail to retrieve.
     * @returns The retrieved transaction detail entity.
     * @throws {NotFoundException} If the transaction detail is not found.
     */
    getById(@Param("id") id: string) {
        return this.transactionDetailService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create a new transaction detail" })
    @ApiBody({ type: SalesDetailDto })
    @ApiResponse({ status: 201, description: "Transaction detail created successfully" })
    /**
     * Creates a new transaction detail.
     *
     * @param dto - The data transfer object containing the new transaction detail information.
     * @returns The newly created transaction detail entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    create(@Body() dto: SalesDetailDto) {
        return this.transactionDetailService.create(dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Update an existing transaction detail" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiBody({ type: SalesDetailDto })
    @ApiResponse({ status: 200, description: "Transaction detail updated successfully" })
    /**
     * Updates an existing transaction detail.
     *
     * @param id - The ID of the transaction detail to update.
     * @param dto - The data transfer object containing the updated transaction detail information.
     * @returns {Promise<SalesDetailEntity>} The updated transaction detail entity.
     * @throws {NotFoundException} If the transaction detail is not found.
     */ 
    update(@Param("id") id: string, @Body() dto: SalesDetailDto) {
        return this.transactionDetailService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Delete transaction detail by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Transaction detail deleted successfully" })
    /**
     * Deletes a transaction detail by its ID.
     *
     * @param id - The ID of the transaction detail to delete.
     *
     * @returns {Promise<void>} A promise that resolves when the transaction detail has been deleted.
     * @throws {NotFoundException} If the transaction detail is not found.
     */
    delete(@Param("id") id: string) {
        return this.transactionDetailService.delete(id);
    }
}
