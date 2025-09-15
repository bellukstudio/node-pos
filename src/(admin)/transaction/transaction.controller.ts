import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { SalesManagementDto } from "./dtos/sales_management.dto";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import {
    ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from "@nestjs/swagger";

@ApiTags("Transactions")
@ApiBearerAuth()
@Controller("transactions")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class TransactionController {
    /**
     * Constructor
     *
     * @param transactionService - The injected TransactionService
     */
    constructor(private readonly transactionService: TransactionService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get all transactions with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "INV-2025-001" })
    @ApiResponse({ status: 200, description: "List of transactions retrieved successfully" })
    /**
     * Retrieves a list of transactions with pagination and search functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - A search query to filter the transactions by. Can be used to search for the transaction id, name, or description.
     * @returns {Promise<{data: TransactionEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved transactions with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.transactionService.getAll(queries);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    @ApiOperation({ summary: "Get transaction by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Transaction retrieved successfully" })
    /**
     * Retrieves a transaction by its ID.
     *
     * @param id - The id of the transaction to retrieve.
     * @returns The retrieved transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    getById(@Param("id") id: string) {
        return this.transactionService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Create a new transaction" })
    @ApiBody({ type: SalesManagementDto })
    @ApiResponse({ status: 201, description: "Transaction created successfully" })
    /**
     * Creates a new transaction.
     *
     * @param dto - The data transfer object containing the new transaction information.
     * @returns The newly created transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    create(@Body() dto: SalesManagementDto) {
        return this.transactionService.create(dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Update an existing transaction" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiBody({ type: SalesManagementDto })
    @ApiResponse({ status: 200, description: "Transaction updated successfully" })
    /**
     * Updates an existing transaction.
     *
     * @param id - The id of the transaction to update.
     * @param dto - The data transfer object containing the updated transaction information.
     * @returns The updated transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    update(@Param("id") id: string, @Body() dto: SalesManagementDto) {
        return this.transactionService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    @ApiOperation({ summary: "Delete a transaction" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Transaction deleted successfully" })
    /**
     * Delete a transaction by its ID.
     * @param id - The ID of the transaction to delete.
     * @returns {Promise<void>} The result of the deletion operation.
     * @throws {NotFoundException} If the transaction is not found.
     */
    delete(@Param("id") id: string) {
        return this.transactionService.delete(id);
    }
}
