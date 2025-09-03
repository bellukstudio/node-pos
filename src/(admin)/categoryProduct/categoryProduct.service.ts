import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryProductEntity } from "src/databases/entities/product/category-product.entity";
import { ILike, Repository } from "typeorm";
import { CreateCategoryProductDto } from "./dto/create-category-product.dto";
import { UpdateCategoryProductDto } from "./dto/update-category-product.dto";

@Injectable()
export class CategoryProductService {

    /**
     * Inject CategoryProductRepository into the service
     * 
     * @param categoryProductRepository - CategoryProductRepository
     */
    constructor(
        @InjectRepository(CategoryProductEntity)
        private readonly categoryProductRepository: Repository<CategoryProductEntity>
    ) { }

    /**
     * Finds all category product entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the category products by. Can be used to search for the category product name.
     * @returns An object with the following properties:
     *   - data: An array of CategoryProductEntity objects.
     *   - total: The total number of category products.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any) {

        const { page = 1, per_page = 10, search = '' } = queries;

        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search
            ? [
                { name: ILike(`%${search}%`) },
            ]
            : {};

        const [result, total] = await this.categoryProductRepository.findAndCount({
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
            total_pages: Math.ceil(total / take),
        }

    }

    /**
     * Finds a category product by id.
     *
     * @param {string} id - The id of the category product to find.
     * @returns {Promise<CategoryProductEntity>} The found category product entity.
     * @throws {NotFoundException} If the category product is not found.
     */
    async getById(id: string) {
        const category = await this.categoryProductRepository.findOne({ where: { id } });

        if (!category) throw new NotFoundException('Category not found');

        return category;
    }

    /**
     * Creates a new category product.
     *
     * @param {CreateCategoryProductDto} dto - The data transfer object containing the new category product information.
     * @returns {Promise<CategoryProductEntity>} The newly created category product entity.
     */
    async create(dto: CreateCategoryProductDto) {
        const category = this.categoryProductRepository.create(dto);

        return this.categoryProductRepository.save(category);
    }

    /**
     * Updates an existing category product.
     *
     * @param {string} id - The id of the category product to update.
     * @param {UpdateCategoryProductDto} dto - The data transfer object containing the updated category product information.
     * @returns {Promise<CategoryProductEntity>} The updated category product entity.
     * @throws {NotFoundException} If the category product is not found.
     */
    async update(id: string, dto: UpdateCategoryProductDto) {
        const category = await this.categoryProductRepository.findOne({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');

        const updated = Object.assign(category, dto);

        return this.categoryProductRepository.save(updated);
    }

    /**
     * Deletes a category product by id.
     *
     * @param {string} id - The id of the category product to delete.
     * @returns {Promise<void>} The deleted category product entity.
     * @throws {NotFoundException} If the category product is not found.
     */
    async delete(id: string) {

        const category = await this.categoryProductRepository.findOne({ where: { id } });
        if (!category) throw new NotFoundException('Category not found');

        return this.categoryProductRepository.remove(category);
    }
}