import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MutationStockEntity } from "src/databases/entities/stock/mutation-stock.entity";
import { ILike, Repository } from "typeorm";
import { MutationStockDto } from "./dtos/mutation-stock.dto";

@Injectable()
export class MutationStockService{

    /**
     * Constructor for MutationStockService.
     * Injects the mutation stock repository.
     * @param mutationStockRepository - The mutation stock repository.
     */
    constructor(
        @InjectRepository(MutationStockEntity)
        private readonly mutationStockRepository: Repository<MutationStockEntity>
    ){}


    /**
     * Finds all mutation stock entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the mutation stocks by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of MutationStockEntity objects.
     *   - total: The total number of mutation stocks.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any){
        const {page = 1, per_page = 0, search = ''} = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? [
            { product: ILike(`%${search}%`) },
            { type: ILike(`%${search}%`) },
            { branch: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.mutationStockRepository.findAndCount({
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
     * Finds a mutation stock entity by id.
     * @param id - The id of the mutation stock to find.
     * @throws {NotFoundException} If the mutation stock is not found.
     * @returns The found mutation stock entity.
     */
    async getById(id: string) {
        const product = await this.mutationStockRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        return product
    }

    /**
     * Creates a new mutation stock entity.
     * @param dto - The data transfer object containing the new mutation stock information.
     * @returns The newly created mutation stock entity.
     */
    async create(dto: MutationStockDto){
        const mutationStock = this.mutationStockRepository.create(dto);
        return await this.mutationStockRepository.save(mutationStock);
    }
    
    /**
     * Updates an existing mutation stock entity.
     * 
     * @param {string} id - The id of the mutation stock to update.
     * @param {MutationStockDto} dto - The data transfer object containing the updated mutation stock information.
     * @returns {Promise<MutationStockEntity>} The updated mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    async update(id: string, dto: MutationStockDto) {
        const mutationStock = await this.mutationStockRepository.findOne({ where: { id } });
        if (!mutationStock) throw new NotFoundException('Product not found');
        const updated = Object.assign(mutationStock, dto);
        return this.mutationStockRepository.save(updated);
    }

    /**
     * Deletes a mutation stock entity by id.
     * @param {string} id - The id of the mutation stock to delete.
     * @returns {Promise<void>} The deleted mutation stock entity.
     * @throws {NotFoundException} If the mutation stock is not found.
     */
    async delete(id: string) {
        const mutationStock = await this.mutationStockRepository.findOne({ where: { id } });
        if (!mutationStock) throw new NotFoundException('Product not found');
        return this.mutationStockRepository.remove(mutationStock);
    }
}