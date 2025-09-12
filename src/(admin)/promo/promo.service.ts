import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscountNpromoEntity } from "src/databases/entities/program/discount-npromo.entity";
import { ILike, Repository } from "typeorm";
import { PromoDto } from "./dtos/promo.dto";
@Injectable()
export class PromoService {
    /**
    * Constructor for PromoController.
    * Injects the DiscountNpromoEntity repository.
    *
    * @param discountRepo - The DiscountNpromoEntity repository.
    */
    constructor(
        @InjectRepository(DiscountNpromoEntity)
        private readonly discountRepo: Repository<DiscountNpromoEntity>
    ) { }


    /**
     * Retrieves a list of promos with pagination and search functionality.
     * @param {any} queries - The query object containing the page, per_page, and search parameters.
     * @returns {Promise<{data: DiscountNpromoEntity[], total: number, page: number, per_page: number, total_pages: number}>}
     */
    async getAll(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);

        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { promo_name: ILike(`%${search}%`) },
            { type_promo: ILike(`%${search}%`) },
            { product: ILike(`%${search}%`) },
        ] : {};

        const [result, total] = await this.discountRepo.findAndCount({
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
     * Retrieves a promo by id.
     * @param {string} id - The id of the promo to retrieve.
     * @throws {NotFoundException} If the promo is not found.
     * @returns {Promise<DiscountNpromoEntity>} The retrieved promo entity.
     */
    async getById(id: string) {
        const promo = await this.discountRepo.findOne({ where: { id: id } });
        if (!promo) throw new NotFoundException('Promo not found');
        return promo
    }

    /**
     * Creates a new promo.
     * 
     * @param {PromoDto} dto - The data transfer object containing the new promo information.
     * @returns {Promise<PromoEntity>} The newly created promo entity.
     */
    async create(dto: PromoDto) {
        const promo = this.discountRepo.create(dto);
        return await this.discountRepo.save(promo);
    }

    /**
     * Updates a promo by id.
     * 
     * @param {string} id - The id of the promo to update.
     * @param {PromoDto} dto - The data transfer object containing the updated promo information.
     * @returns {Promise<PromoEntity>} The updated promo entity.
     * @throws {NotFoundException} If the promo is not found.
     */
    async update(id: string, dto: PromoDto) {
        const promo = await this.discountRepo.findOne({ where: { id: id } });
        if (!promo) throw new NotFoundException('Promo not found');
        const updated = Object.assign(promo, dto);
        return await this.discountRepo.save(updated);
    }

    /**
     * Deletes a promo by id.
     * 
     * @param {string} id - The id of the promo to delete.
     * @returns {Promise<void>} The deleted promo.
     * @throws {NotFoundException} If the promo is not found.
     */
    async delete(id: string) {
        const promo = await this.discountRepo.findOne({ where: { id: id } });
        if (!promo) throw new NotFoundException('Promo not found');
        return await this.discountRepo.remove(promo);
    }
}