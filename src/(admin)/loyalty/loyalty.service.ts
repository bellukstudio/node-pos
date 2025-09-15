import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PointsLoyaltyEntity } from "src/databases/entities/program/points-loyalty.entity";
import { ILike, Repository } from "typeorm";
import { LoyaltyDto } from "./dtos/loyalty.dto";

@Injectable()
export class LoyaltyService {
    /**
     * Constructor for the LoyaltyService.
     * @param pointsLoyaltyRepository - The repository for PointsLoyaltyEntity.
     */
    constructor(
        @InjectRepository(PointsLoyaltyEntity)
        private readonly pointsLoyaltyRepository: Repository<PointsLoyaltyEntity>
    ) { }

    /**
     * Retrieves a list of points loyalty records with pagination and search functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - A search query to filter the points loyalty records by. Can be used to search for the member name.
     * @returns {Promise<{data: PointsLoyaltyEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved points loyalty records with pagination and search functionality.
    **/
    async getAll(queries: any) {
        const { page = 1, per_page = 10, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;
        const where = search ? [
            { member: ILike(`%${search}%`) }
        ] : {};
        const [result, total] = await this.pointsLoyaltyRepository.findAndCount({
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
     * Retrieves a points loyalty record by its id.
     * @param id - The id of the points loyalty record to retrieve.
     * @returns {Promise<PointsLoyaltyEntity>} The retrieved points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    async getById(id: string) {
        const point = await this.pointsLoyaltyRepository.findOneBy({ id: id });
        if (!point) throw new NotFoundException('Point not found');
        return point;
    }

    /**
     * Retrieves a points loyalty record by its member id.
     * @param idMember - The id of the member to retrieve the points loyalty record for.
     * @returns {Promise<PointsLoyaltyEntity>} The retrieved points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    async getByMember(idMember: string) {
        const point = await this.pointsLoyaltyRepository.findOne({
            where: { member: { id: idMember } },
            relations: ["member"],
        });

        if (!point) throw new NotFoundException("Point not found");
        return point;
    }

    /**
     * Saves a new points loyalty record.
     * @param {LoyaltyDto} dto - The data transfer object containing the new points loyalty information.
     * @returns {Promise<PointsLoyaltyEntity>} The newly created points loyalty record.
     */
    async savePoint(dto: LoyaltyDto) {
        const point = this.pointsLoyaltyRepository.create(dto);
        return await this.pointsLoyaltyRepository.save(point);
    }

    /**
     * Updates an existing points loyalty record.
     * 
     * @param {string} id - The id of the points loyalty record to update.
     * @param {LoyaltyDto} dto - The data transfer object containing the updated points loyalty information.
     * @returns {Promise<PointsLoyaltyEntity>} The updated points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    async updatePoint(id: string, dto: LoyaltyDto) {
        const point = await this.pointsLoyaltyRepository.findOneBy({ id: id });
        if (!point) throw new NotFoundException('Point not found');
        const updated = Object.assign(point, dto);
        return await this.pointsLoyaltyRepository.save(updated);
    }

    /**
     * Deletes a points loyalty record by its id.
     * @param id - The id of the points loyalty record to delete.
     * @returns {Promise<void>} The deleted points loyalty record.
     * @throws {NotFoundException} If the points loyalty record is not found.
     */
    async delete(id: string) {
        const point = await this.pointsLoyaltyRepository.softDelete(id);
        if (!point) throw new NotFoundException('Point not found');
        return { message: 'Point deleted successfully' };
    }

}