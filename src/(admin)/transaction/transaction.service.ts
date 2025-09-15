import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesManagementEntity } from "src/databases/entities/sales/sales-management.entity";
import { ILike, Repository } from "typeorm";
import { SalesManagementDto } from "./dtos/sales_management.dto";


@Injectable()
export class TransactionService {

    /**
     * Constructor
     *
     * @param salesManagementRepository - The sales management repository, injected by Nest.
     */
    constructor(
        @InjectRepository(SalesManagementEntity)
        private readonly salesManagementRepository: Repository<SalesManagementEntity>
    ) { }


    /**
     * Finds all sales managements.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the sales managements by. Can be used to search for the sales management name.
     * @returns An object with the following properties:
     *   - data: An array of SalesManagementEntity objects.
     *   - total: The total number of sales managements.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any) {
        const { page, per_page, search } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { transaction_number: ILike(`%${search}%`) },
            { method_payment: ILike(`%${search}%`) },
            { user: ILike(`%${search}%`) },
            { branch: ILike(`%${search}%`) },
            { status_payment: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.salesManagementRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        });

        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: take,
            total_pages: Math.ceil(total / take)
        }
    }


    /**
     * Finds a transaction by id.
     *
     * @param {string} id - The id of the transaction to find.
     * @returns {Promise<SalesManagementEntity>} The found transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async getById(id: string) {
        const transaction = await this.salesManagementRepository.findOneBy({ id });
        if (!transaction) throw new NotFoundException('Transaction not found');
        return transaction
    }

    /**
     * Creates a new transaction.
     *
     * @param {SalesManagementDto} dto - The data transfer object containing the new transaction information.
     * @returns {Promise<SalesManagementEntity>} The newly created transaction entity.
     */
    async create(dto: SalesManagementDto) {
        const transaction = this.salesManagementRepository.create(dto);
        return this.salesManagementRepository.save(transaction);
    }

    /**
     * Updates an existing transaction.
     *
     * @param {string} id - The id of the transaction to update.
     * @param {SalesManagementDto} dto - The data transfer object containing the updated transaction information.
     * @returns {Promise<SalesManagementEntity>} The updated transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async update(id: string, dto: SalesManagementDto) {

        const transaction = await this.salesManagementRepository.findOneBy({ id });
        if (!transaction) throw new NotFoundException('Transaction not found');
        const updated = Object.assign(transaction, dto);
        return this.salesManagementRepository.save(updated);
    }
    /**
     * Deletes a transaction by id.
     *
     * @param {string} id - The id of the transaction to delete.
     * @returns {Promise<void>} The deleted transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async delete(id: string) {
        const transaction = await this.salesManagementRepository.softDelete(id);
        if (!transaction) throw new NotFoundException('Transaction not found');
        return { message: 'Transaction deleted successfully' };
    }
}