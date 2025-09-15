import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReturnOfGoodsEntity } from "src/databases/entities/stock/return-of-goods.entity";
import { ILike, Repository } from "typeorm";
import { ReturnGoodsDto } from "./dtos/return-goods.dto";

@Injectable()
export class ReturnOfGoodsService {

    /**
     * Injects the return of goods repository.
     * @param returnOfGoodsRepository - The return of goods repository.
     */
    constructor(
        @InjectRepository(ReturnOfGoodsEntity)
        private readonly returnOfGoodsRepository: Repository<ReturnOfGoodsEntity>
    ){}

    /**
     * Finds all return of goods entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the return of goods by. Can be used to search for the product name.
     * @returns An object with the following properties:
     *   - data: An array of ReturnOfGoodsEntity objects.
     *   - total: The total number of return of goods.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any){
        const {page =1, per_page = 0, search = ''} = queries;

        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { product: ILike(`%${search}%`) },
            { branch: ILike(`%${search}%`) },
            { type: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.returnOfGoodsRepository.findAndCount({
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
     * Finds a return of goods by id.
     * 
     * @param {string} id - The id of the return of goods to find.
     * @returns {Promise<ReturnOfGoodsEntity>} The return of goods entity if found, otherwise a NotFoundException is thrown.
     */
    async getById(id:string){
        const product = await this.returnOfGoodsRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        return product
    }

    /**
     * Creates a new return of goods.
     * 
     * @param {ReturnGoodsDto} dto - The data transfer object containing the new return of goods information.
     * @returns {Promise<ReturnOfGoodsEntity>} The newly created return of goods entity.
     */
    async create(dto: ReturnGoodsDto){
        const product = this.returnOfGoodsRepository.create(dto);
        return await this.returnOfGoodsRepository.save(product);
    }

    /**
     * Updates an existing return of goods.
     * 
     * @param {string} id - The id of the return of goods to update.
     * @param {ReturnGoodsDto} dto - The data transfer object containing the updated return of goods information.
     * @returns {Promise<ReturnOfGoodsEntity>} The updated return of goods entity.
     * @throws {NotFoundException} If the return of goods is not found.
     */
    async update(id:string, dto: ReturnGoodsDto){
        const product = await this.returnOfGoodsRepository.findOne({ where: { id } });
        if (!product) throw new NotFoundException('Product not found');
        const updated = Object.assign(product, dto);
        return this.returnOfGoodsRepository.save(updated);
    }

    /**
     * Deletes a return of goods by id.
     * 
     * @param {string} id - The id of the return of goods to delete.
     * @returns {Promise<void>} The deleted return of goods entity.
     * @throws {NotFoundException} If the return of goods is not found.
     */
    async delete(id:string){
        const product = await this.returnOfGoodsRepository.softDelete(id);
        if (!product) throw new NotFoundException('Product not found');
        return { message: 'Product deleted successfully' };
    }
}