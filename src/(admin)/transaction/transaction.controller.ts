import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dtos/create-transaction.dto";
import { UpdateTransactionDto } from "./dtos/update-transaction.dto";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";

@Controller('transaction')
export class TransactionController {

    /**
     * Constructor
     *
     * @param transactionController - The injected TransactionService
     */
    constructor(
        private readonly transactionService: TransactionService
    ) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds all transactions.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the transactions by. Can be used to search for the sales management name.
     * @returns An object with the following properties:
     *   - data: An array of SalesManagementEntity objects.
     *   - total: The total number of sales managements.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.transactionService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds a transaction by id.
     *
     * @param {string} id - The id of the transaction to find.
     * @returns {Promise<SalesManagementEntity>} The found transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    getById(@Query('id') id: string) {
        return this.transactionService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new transaction.
     *
     * @param {CreateTransactionDto} dto - The data transfer object containing the new transaction information.
     * @returns {Promise<SalesManagementEntity>} The newly created transaction entity.
     */
    create(@Body() dto: CreateTransactionDto) {
        return this.transactionService.create(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)

    /**
     * Updates an existing transaction.
     *
     * @param {string} id - The id of the transaction to update.
     * @param {UpdateTransactionDto} dto - The data transfer object containing the updated transaction information.
     * @returns {Promise<SalesManagementEntity>} The updated transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    update(@Param('id') id: string, @Body() dto: UpdateTransactionDto) {
        return this.transactionService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a transaction by id.
     *
     * @param {string} id - The id of the transaction to delete.
     * @returns {Promise<void>} A promise that resolves when the transaction has been deleted.
     * @throws {NotFoundException} If the transaction is not found.
     */
    delete(@Param('id') id: string) {
        return this.transactionService.delete(id);
    }
}