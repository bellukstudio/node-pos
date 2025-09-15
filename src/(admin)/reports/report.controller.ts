import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { ReportService } from "./report.service";
import { SalesReportDto } from "./dtos/sales-report.dto";
import { StockReportDto } from "./dtos/stock-report.dto";
import { FinancialStatementDto } from "./dtos/financial-statement.dto";
import { RolesGuard } from "src/core/guard/role.guard";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiQuery,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";

@ApiTags("Reports")
@ApiBearerAuth()
@Controller("reports")
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Get("sales-reports")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Get all sales reports with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "January 2025" })
    @ApiResponse({ status: 200, description: "Sales reports retrieved successfully" })
    /**
     * Finds all sales reports.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the sales reports by. Can be used to search for the sales report branch name.
     * @returns An object with the following properties:
     *   - data: An array of SalesReportEntity objects.
     *   - total: The total number of sales reports.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getSalesReport(@Query() queries: any) {
        return this.reportService.getSalesReport(queries);
    }

    @Get("stock-reports")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Get all stock reports with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "Warehouse A" })
    @ApiResponse({ status: 200, description: "Stock reports retrieved successfully" })
    /**
     * Finds all stock reports.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the stock reports by. Can be used to search for the stock report branch name, product name, initial stock, stock sold, stock in, or remaining stock.
     * @returns An object with the following properties:
     *   - data: An array of StockReportEntity objects.
     *   - total: The total number of stock reports.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getStockReport(@Query() queries: any) {
        return this.reportService.getStockReport(queries);
    }

    @Get("financial-statements")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Get all financial statements with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "Q1 2025" })
    @ApiResponse({ status: 200, description: "Financial statements retrieved successfully" })
    /**
     * Finds all financial statement entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the financial statements by. Can be used to search for the financial statement branch name, date report, total income, total expenditure, or net profit.
     * @returns An object with the following properties:
     *   - data: An array of FinancialStatementEntity objects.
     *   - total: The total number of financial statements.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getFinancialStatement(@Query() queries: any) {
        return this.reportService.getFinancialStatement(queries);
    }

    @Post("sales-reports")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Create a new sales report" })
    @ApiBody({ type: SalesReportDto })
    @ApiResponse({ status: 201, description: "Sales report created successfully" })
    /**
     * Creates a new sales report.
     * @param {SalesReportDto} dto - The data transfer object containing the new sales report information.
     * @returns {Promise<SalesReportEntity>} The newly created sales report entity.
     */
    createSalesReport(@Body() dto: SalesReportDto) {
        return this.reportService.createSalesReport(dto);
    }

    @Post("stock-reports")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Create a new stock report" })
    @ApiBody({ type: StockReportDto })
    @ApiResponse({ status: 201, description: "Stock report created successfully" })
    /**
     * Creates a new stock report.
     * 
     * @param dto - The stock report data transfer object containing the new stock report information.
     * @returns A promise with the newly created stock report entity.
     */
    createStockReport(@Body() dto: StockReportDto) {
        return this.reportService.createStockReport(dto);
    }

    @Post("financial-statements")
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor)
    @ApiOperation({ summary: "Create a new financial statement" })
    @ApiBody({ type: FinancialStatementDto })
    @ApiResponse({ status: 201, description: "Financial statement created successfully" })
    /**
     * Creates a new financial statement.
     * 
     * @param dto - The financial statement data transfer object containing the new financial statement information.
     * @returns A promise with the newly created financial statement entity.
     */
    createFinancialStatement(@Body() dto: FinancialStatementDto) {
        return this.reportService.createFinancialStatement(dto);
    }

    @Delete("sales-reports/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager)
    @ApiOperation({ summary: "Delete a sales report by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Sales report deleted successfully" })
    /**
     * Deletes a sales report by ID.
     * 
     * @param id - The ID of the sales report to delete.
     * @returns A promise with the deleted sales report entity.
     * @throws {NotFoundException} If the sales report is not found.
     */
    deleteSalesReport(@Param("id") id: string) {
        return this.reportService.deleteSalesReport(id);
    }

    @Delete("stock-reports/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager)
    @ApiOperation({ summary: "Delete a stock report by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Stock report deleted successfully" })
    /**
     * Deletes a stock report by ID.
     * 
     * @param id - The ID of the stock report to delete.
     * @returns A promise with the deleted stock report entity.
     * @throws {NotFoundException} If the stock report is not found.
     */ 
    deleteStockReport(@Param("id") id: string) {
        return this.reportService.deleteStockReport(id);
    }

    @Delete("financial-statements/:id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager)
    @ApiOperation({ summary: "Delete a financial statement by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "Financial statement deleted successfully" })
    /**
     * Deletes a financial statement by ID.
     * 
     * @param id - The ID of the financial statement to delete.
     * @returns A promise with the deleted financial statement entity.
     * @throws {NotFoundException} If the financial statement is not found.
     */
    deleteFinancialStatement(@Param("id") id: string) {
        return this.reportService.deleteFinancialStatement(id);
    }
}
