import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PurchaseProductEntity } from "src/databases/entities/supply/purchase-product.entity";
import { ILike, Repository } from "typeorm";
import { PurchaseProductDto } from "./dtos/purchase-product.dto";

@Injectable()
export class PurchaseProductService {

    /**
     * Constructor
     *
     * @param purchaseProductRepository - The purchase product repository, injected by Nest.
     */
    constructor(
        @InjectRepository(PurchaseProductEntity)
        private readonly purchaseProductRepository: Repository<PurchaseProductEntity>
    ) { }


    /**
     * Finds all purchase product entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the purchase products by. Can be used to search for the branch name or supplier name.
     * @returns An object with the following properties:
     *   - data: An array of PurchaseProductEntity objects.
     *   - total: The total number of purchase products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { branch: ILike(`%${search}%`) },
            { supplier: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.purchaseProductRepository.findAndCount({
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
     * Finds a purchase product by id.
     *
     * @param {string} id - The id of the purchase product to find.
     * @returns {Promise<PurchaseProductEntity>} The found purchase product entity.
     * @throws {NotFoundException} If the purchase product is not found.
     */
    async getById(id: string) {
        const purchase_product = await this.purchaseProductRepository.findOne({ where: { id } });
        if (!purchase_product) throw new NotFoundException('Purchase product not found');
        return purchase_product
    }


    /**
     * Creates a new purchase product.
     * 
     * @param {PurchaseProductDto} dto - The data transfer object containing the new purchase product information.
     * @returns {Promise<PurchaseProductEntity>} The newly created purchase product entity.
     */
    async create(dto: PurchaseProductDto) {
        const purchase_product = this.purchaseProductRepository.create(dto);
        return this.purchaseProductRepository.save(purchase_product);
    }

    /**
     * Updates an existing purchase product.
     * 
     * @param {string} id - The id of the purchase product to update.
     * @param {PurchaseProductDto} dto - The data transfer object containing the updated purchase product information.
     * @returns {Promise<PurchaseProductEntity>} The updated purchase product entity.
     * @throws {NotFoundException} If the purchase product is not found.
     */
    async update(id: string, dto: PurchaseProductDto) {
        const purchase_product = await this.purchaseProductRepository.findOne({ where: { id } });
        if (!purchase_product) throw new NotFoundException('Purchase product not found');
        const updated = Object.assign(purchase_product, dto);
        return this.purchaseProductRepository.save(updated);
    }


    /**
     * Deletes a purchase product by id.
     *
     * @param {string} id - The id of the purchase product to delete.
     * @returns {Promise<void>} The deleted purchase product entity.
     * @throws {NotFoundException} If the purchase product is not found.
     */
    async delete(id: string) {
        const purchase_product = await this.purchaseProductRepository.softDelete(id);
        if (!purchase_product) throw new NotFoundException('Purchase product not found');
        return { message: 'Purchase product deleted successfully' };
    }

}