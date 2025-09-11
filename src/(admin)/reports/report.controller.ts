import { Controller, Query } from "@nestjs/common";
import { ReportService } from "./report.service";
import { SalesReportDto } from "./dtos/sales-report.dto";
import { StockReportDto } from "./dtos/stock-report.dto";
import { FinancialStatementDto } from "./dtos/financial-statement.dto";

@Controller()
export class ReportController {
    /**
     * Constructor for ReportController
     * Injects the ReportService
     * @param reportService - The report service.
     */
    constructor(
        private readonly reportService: ReportService
    ) { }

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

    /**
     * Creates a new sales report.
     * 
     * @param {SalesReportDto} dto - The data transfer object containing the new sales report information.
     * @returns {Promise<SalesReportEntity>} The newly created sales report entity.
     */
    createSalesReport(dto: SalesReportDto) {
        return this.reportService.createSalesReport(dto);
    }
    /**
     * Creates a new stock report.
     * 
     * @param {StockReportDto} dto - The data transfer object containing the new stock report information.
     * @returns {Promise<StockReportEntity>} The newly created stock report entity.
     */
    createStockReport(dto: StockReportDto) {
        return this.reportService.createStockReport(dto);
    }
    /**
     * Creates a new financial statement.
     * 
     * @param {FinancialStatementDto} dto - The data transfer object containing the new financial statement information.
     * @returns {Promise<FinancialStatementEntity>} The newly created financial statement entity.
     */
    createFinancialStatement(dto: FinancialStatementDto) {
        return this.reportService.createFinancialStatement(dto);
    }

    /**
     * Deletes a sales report by id.
     * 
     * @param {string} id - The id of the sales report to delete.
     * @returns {Promise<void>} The deleted sales report entity.
     * @throws {NotFoundException} If the sales report is not found.
     */
    
    deleteSalesReport(id: string) {
        return this.reportService.deleteSalesReport(id);
    }
    /**
     * Deletes a stock report by id.
     * 
     * @param {string} id - The id of the stock report to delete.
     * @returns {Promise<void>} The deleted stock report entity.
     * @throws {NotFoundException} If the stock report is not found.
     */
    deleteStockReport(id: string) {
        return this.reportService.deleteStockReport(id);
    }
    /**
     * Deletes a financial statement by id.
     * 
     * @param {string} id - The id of the financial statement to delete.
     * @returns {Promise<void>} The deleted financial statement entity.
     * @throws {NotFoundException} If the financial statement is not found.
     */
    deleteFinancialStatement(id: string) {
        return this.reportService.deleteFinancialStatement(id);
    }
}