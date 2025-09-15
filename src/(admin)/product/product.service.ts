import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "src/databases/entities/product/product.entity";
import { ILike, Repository } from "typeorm";
import { ProductDto } from "./dtos/product.dto";

@Injectable()
export class ProductService {

    /**
     * Constructor
     *
     * @param productRepository - The product repository, injected by Nest.
     */
    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>
    ) { }


    /**
     * Finds all product entities.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the products by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of ProductEntity objects.
     *   - total: The total number of products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;


        const where = search ? [
            { name: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.productRepository.findAndCount({
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
     * Finds a product by id.
     *
     * @param {string} id - The id of the product to find.
     * @returns {Promise<ProductEntity>} The found product entity.
     * @throws {NotFoundException} If the product is not found.
     */

    async getById(id: string) {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        return product
    }

    /**
     * Creates a new product.
     *
     * @param {ProductDto} dto - The data transfer object containing the new product information.
     * @returns {Promise<ProductEntity>} The newly created product entity.
     */
    async create(dto: ProductDto) {
        const product = this.productRepository.create(dto);
        return this.productRepository.save(product);
    }


    /**
     * Updates an existing product.
     *
     * @param {string} id - The id of the product to update.
     * @param {ProductDto} dto - The data transfer object containing the updated product information.
     * @returns {Promise<ProductEntity>} The updated product entity.
     * @throws {NotFoundException} If the product is not found.
     */
    async update(id: string, dto: ProductDto) {

        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        const updated = Object.assign(product, dto);
        return this.productRepository.save(updated);

    }

    /**
        * Deletes a product by id.
        *
        * @param {string} id - The id of the product to delete.
        * @returns {Promise<void>} A promise that resolves when the product has been deleted.
        * @throws {NotFoundException} If the product is not found.
        */
    async delete(id: string) {

        const product = await this.productRepository.softDelete(id);
        if (!product) throw new NotFoundException('Product not found');
        return { message: 'Product deleted successfully' };
    }
}