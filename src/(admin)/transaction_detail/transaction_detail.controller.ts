import { TransactionDetailService } from "./transaction_detail.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { TransactionDetailDto } from "./dtos/transaction_detail.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
@Controller()
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TransactionDetailController {

    /**
     * Constructor
     *
     * @param transactionDetailService - The injected TransactionDetailService
     */
    constructor(
        private readonly transactionDetailService: TransactionDetailService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)

    /**
     * Finds all transaction detail entities.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the transaction detail by. Can be used to search for the transaction detail name.
     * @returns An object with the following properties:
     *   - data: An array of SalesDetailEntity objects.
     *   - total: The total number of transaction details.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.transactionDetailService.getAll(queries);
    }

    
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)

    /**
     * Finds a transaction detail by id.
     *
     * @param id - The id of the transaction detail to find.
     * @returns The found transaction detail entity.
     * @throws {NotFoundException} If the transaction detail is not found.
     */
    getById(@Param('id') id: string) {
        return this.transactionDetailService.getById(id);
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    create(@Body() dto: TransactionDetailDto) {
        return this.transactionDetailService.create(dto);
    }


    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)

    /**
     * Updates an existing transaction detail.
     *
     * @param id - The id of the transaction detail to update.
     * @param dto - The data transfer object containing the updated transaction detail information.
     * @returns The updated transaction detail entity.
     * @throws {NotFoundException} If the transaction detail is not found.
     */
    update(@Param('id') id: string, @Body() dto: TransactionDetailDto) {
        return this.transactionDetailService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Deletes a transaction detail by id.
     *
     * @param id - The id of the transaction detail to delete.
     * @returns The deleted transaction detail entity.
     * @throws {NotFoundException} If the transaction detail is not found.
     */
    delete(@Param('id') id: string) {
        return this.transactionDetailService.delete(id);
    }
}