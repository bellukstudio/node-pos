import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FinancialStatementEntity } from "src/databases/entities/report/financial-statement.entity";
import { SalesReportEntity } from "src/databases/entities/report/sales-report.entity";
import { StockReportEntity } from "src/databases/entities/report/stock-report.entity";
import { ILike, Repository } from "typeorm";
import { SalesReportDto } from "./dtos/sales-report.dto";
import { StockReportDto } from "./dtos/stock-report.dto";
import { FinancialStatementDto } from "./dtos/financial-statement.dto";

@Injectable()
export class ReportService {
    /**
     * Constructor for ReportService
     * Injects the sales report, stock report, and financial statement repositories.
     * @param salesReportRepository - The sales report repository.
     * @param stockReportRepository - The stock report repository.
     * @param financialStatementRepository - The financial statement repository.
     */
    constructor(
        @InjectRepository(SalesReportEntity)
        private readonly salesReportRepository: Repository<SalesReportEntity>,
        @InjectRepository(StockReportEntity)
        private readonly stockReportRepository: Repository<StockReportEntity>,
        @InjectRepository(FinancialStatementEntity)
        private readonly financialStatementRepository: Repository<FinancialStatementEntity>,
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
    async getSalesReport(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? [
            { branch: ILike(`%${search}%`) },
            { date_report: ILike(`%${search}%`) },
            { total_sales: ILike(`%${search}%`) },
            { total_income: ILike(`%${search}%`) },
            { total_profit: ILike(`%${search}%`) },
            { total_tax: ILike(`%${search}%`) },
            { total_discount: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.salesReportRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        });
        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take)
        }
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
    async getStockReport(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? [
            { branch: ILike(`%${search}%`) },
            { product: ILike(`%${search}%`) },
            { initial_stock: ILike(`%${search}%`) },
            { stock_sold: ILike(`%${search}%`) },
            { stock_in: ILike(`%${search}%`) },
            { remaining_stock: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.stockReportRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        });
        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take)
        }
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
    async getFinancialStatement(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? [
            { branch: ILike(`%${search}%`) },
            { date_report: ILike(`%${search}%`) },
            { total_income: ILike(`%${search}%`) },
            { total_expenditure: ILike(`%${search}%`) },
            { net_profit: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.financialStatementRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        });
        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take)
        }
    }
    /**
     * Creates a new sales report.
     * 
     * @param {SalesReportDto} dto - The data transfer object containing the new sales report information.
     * @returns {Promise<SalesReportEntity>} The newly created sales report entity.
     */
    async createSalesReport(dto: SalesReportDto) {
        const sales = this.salesReportRepository.create(dto);
        return await this.salesReportRepository.save(sales);
    }
    /**
     * Creates a new stock report.
     * 
     * @param {StockReportDto} dto - The data transfer object containing the new stock report information.
     * @returns {Promise<StockReportEntity>} The newly created stock report entity.
     */
    async createStockReport(dto: StockReportDto) {
        const stock = this.stockReportRepository.create(dto);
        return await this.stockReportRepository.save(stock);
    }
    /**
     * Creates a new financial statement.
     * 
     * @param {FinancialStatementDto} dto - The data transfer object containing the new financial statement information.
     * @returns {Promise<FinancialStatementEntity>} The newly created financial statement entity.
     */
    async createFinancialStatement(dto: FinancialStatementDto) {
        const statement = this.financialStatementRepository.create(dto);
        return await this.financialStatementRepository.save(statement);
    }

    /**
     * Deletes a stock report by id.
     * 
     * @param {string} id - The id of the stock report to delete.
     * @returns {Promise<void>} The deleted stock report entity.
     * @throws {NotFoundException} If the stock report is not found.
     */
    
    async deleteStockReport(id: string) {
        const stock = await this.stockReportRepository.findOneBy({ id });
        return await this.stockReportRepository.remove(stock);
    }
    /**
     * Deletes a sales report by id.
     * 
     * @param {string} id - The id of the sales report to delete.
     * @returns {Promise<void>} The deleted sales report entity.
     * @throws {NotFoundException} If the sales report is not found.
     */
    async deleteSalesReport(id: string) {
        const sales = await this.salesReportRepository.findOneBy({ id });
        return await this.salesReportRepository.remove(sales);
    }
    /**
     * Deletes a financial statement by id.
     * 
     * @param {string} id - The id of the financial statement to delete.
     * @returns {Promise<void>} The deleted financial statement entity.
     * @throws {NotFoundException} If the financial statement is not found.
     */
    async deleteFinancialStatement(id: string) {
        const statement = await this.financialStatementRepository.findOneBy({ id });
        return await this.financialStatementRepository.remove(statement);
    }
}