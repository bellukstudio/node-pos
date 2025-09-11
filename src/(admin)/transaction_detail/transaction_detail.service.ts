import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SalesDetailEntity } from "src/databases/entities/sales/sales-detail.entity";
import { ILike, Repository } from "typeorm";
import { TransactionDetailDto } from "./dtos/transaction_detail.dto";

@Injectable()
export class TransactionDetailService {

    /**
     * Injects the sales detail repository.
     * @param salesDetailRepository - The sales detail repository.
     */
    constructor(
        @InjectRepository(SalesDetailEntity)
        private readonly salesDetailRepository: Repository<SalesDetailEntity>
    ) { }


    /**
     * Finds all sales detail entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the sales detail by. Can be used to search for the sales detail name.
     * @returns An object with the following properties:
     *   - data: An array of SalesDetailEntity objects.
     *   - total: The total number of sales detail.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     *
     **/
    async getAll(queries: any) {
        const { page, per_page, search } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;


        const where = search ? [
            { sales: ILike(`%${search}%`) },
            { product: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.salesDetailRepository.findAndCount({
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
     * Finds a transaction detail by id.
     * 
     * @param {string} id - The id of the transaction to find.
     * @returns {Promise<SalesDetailEntity>} The found transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async getById(id: string) {
        const transaction = await this.salesDetailRepository.findOne({ where: { id } });
        if (!transaction) throw new NotFoundException('Transaction not found');
        return transaction
    }
    /**
     * Creates a new transaction.
     *
     * @param {TransactionDetailDto} dto - The data transfer object containing the new transaction information.
     * @returns {Promise<SalesDetailEntity>} The newly created transaction entity.
     */
    async create(dto: TransactionDetailDto) {
        const transaction = this.salesDetailRepository.create(dto);

        return this.salesDetailRepository.save(transaction);
    }
    /**
     * Updates an existing transaction.
     *
     * @param {string} id - The id of the transaction to update.
     * @param {TransactionDetailDto} dto - The data transfer object containing the updated transaction information.
     * @returns {Promise<SalesDetailEntity>} The updated transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async update(id: string, dto: TransactionDetailDto) {
        const transaction = await this.salesDetailRepository.findOneBy({ id });
        if (!transaction) throw new NotFoundException('Transaction not found');
        const updated = Object.assign(transaction, dto);
        return this.salesDetailRepository.save(updated);
    }
    /**
     * Deletes a transaction by id.
     *
     * @param {string} id - The id of the transaction to delete.
     * @returns {Promise<void>} The deleted transaction entity.
     * @throws {NotFoundException} If the transaction is not found.
     */
    async delete(id: string) {
        const transaction = await this.salesDetailRepository.findOneBy({ id });
        if (!transaction) throw new NotFoundException('Transaction not found');
        return this.salesDetailRepository.remove(transaction);
    }
}