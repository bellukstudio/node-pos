import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DetailPurchaseEntity } from "src/databases/entities/supply/detail-purchase.entity";
import { ILike, Repository } from "typeorm";
import { DetailPurchaseDto } from "./dtos/detail_purchase.dto";

@Injectable()
export class DetailPurchaseService{

    /**
     * Constructor
     *
     * @param detailPurchaseRepository - The detail purchase repository, injected by Nest.
     */
    constructor(
        @InjectRepository(DetailPurchaseEntity)
        private readonly detailPurchaseRepository: Repository<DetailPurchaseEntity>
    ){}


    /**
     * Finds all detail purchase entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the detail purchase by. Can be used to search for the purchase name or product name.
     * @returns An object with the following properties:
     *   - data: An array of DetailPurchaseEntity objects.
     *   - total: The total number of detail purchase.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any){
        const {page = 1, per_page = 0, search = ''} = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { purchase: ILike(`%${search}%`) },
            { product: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.detailPurchaseRepository.findAndCount({
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
        };
    }


    /**
     * Finds a detail purchase by id.
     *
     * @param {string} id - The id of the detail purchase to find.
     * @returns {Promise<DetailPurchaseEntity>} The found detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    async getById(id: string) {
        const detailPurchase = await this.detailPurchaseRepository.findOne({ where: { id } });
        if (!detailPurchase) throw new NotFoundException('Detail purchase not found');
        return detailPurchase;
    }


    /**
     * Creates a new detail purchase.
     * 
     * @param {DetailPurchaseDto} dto - The data transfer object containing the new detail purchase information.
     * @returns {Promise<DetailPurchaseEntity>} The newly created detail purchase entity.
     */
    async create(dto: DetailPurchaseDto){
        const detailPurchase = this.detailPurchaseRepository.create(dto);
        return this.detailPurchaseRepository.save(detailPurchase);
    }

    /**
     * Updates an existing detail purchase.
     * 
     * @param {string} id - The id of the detail purchase to update.
     * @param {DetailPurchaseDto} dto - The data transfer object containing the updated detail purchase information.
     * @returns {Promise<DetailPurchaseEntity>} The updated detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    async update(id:string, dto: DetailPurchaseDto) {
        const detailPurchase = await this.detailPurchaseRepository.findOne({ where: { id } });
        if (!detailPurchase) throw new NotFoundException('Detail purchase not found');
        const updated = Object.assign(detailPurchase, dto);
        return this.detailPurchaseRepository.save(updated);
    }


    /**
     * Deletes a detail purchase by id.
     *
     * @param {string} id - The id of the detail purchase to delete.
     * @returns {Promise<void>} The deleted detail purchase entity.
     * @throws {NotFoundException} If the detail purchase is not found.
     */
    async delete(id: string) {
        const detailPurchase = await this.detailPurchaseRepository.findOne({ where: { id } });
        if (!detailPurchase) throw new NotFoundException('Detail purchase not found');
        return this.detailPurchaseRepository.remove(detailPurchase);
    }
}