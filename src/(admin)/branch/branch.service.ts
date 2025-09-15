import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { Repository, ILike } from "typeorm";
import { BranchDto } from "./dtos/branch.dto";

@Injectable()
export class BranchService {
    /**
     * Constructor
     *
     * @param branchRepository - The branch repository, injected by Nest.
     */
    constructor(
        @InjectRepository(BranchEntity)
        private readonly branchRepository: Repository<BranchEntity>
    ) { }

    /**
     * Finds all branches.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the branches by. Can be used to search for the branch name, address, or city.
     * @returns An object with the following properties:
     *   - data: An array of BranchEntity objects.
     *   - total: The total number of branches.
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
                { address: ILike(`%${search}%`) },
                { city: ILike(`%${search}%`) },
            ]
            : {};

        const [result, total] = await this.branchRepository.findAndCount({
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
        };
    }

    /**
     * Finds a branch by id.
     *
     * @param {string} id - The id of the branch to find.
     * @returns {Promise<BranchEntity>} The found branch entity.
     * @throws {NotFoundException} If the branch is not found.
     */
    async getById(id: string) {
        const branch = await this.branchRepository.findOne({ where: { id } });
        if (!branch) throw new NotFoundException('Branch not found');
        return branch;
    }

    /**
     * Creates a new branch.
     *
     * @param {BranchDto} dto - The data transfer object containing the new branch information.
     * @returns {Promise<BranchEntity>} The newly created branch entity.
     */
    async create(dto: BranchDto) {
        const branch = this.branchRepository.create(dto);
        return this.branchRepository.save(branch);
    }

    /**
     * Updates an existing branch with new data.
     *
     * @param {string} id - The ID of the branch to update.
     * @param {BranchDto} dto - The data transfer object containing updated branch information.
     * @throws {NotFoundException} If the branch with the given ID is not found.
     * @returns {Promise<BranchEntity>} The updated branch entity.
     */

    async update(id: string, dto: BranchDto) {
        const branch = await this.branchRepository.findOne({ where: { id } });
        if (!branch) throw new NotFoundException('Branch not found');

        const updated = Object.assign(branch, dto);
        return this.branchRepository.save(updated);
    }

    /**
     * Deletes a branch by its ID.
     *
     * @param {string} id - The ID of the branch to be deleted.
     * @throws {NotFoundException} If the branch with the given ID is not found.
     * @returns {Promise<BranchEntity>} The removed branch entity.
     */

    async delete(id: string) {
        const branch = await this.branchRepository.softDelete(id);
        if (!branch) throw new NotFoundException('Branch not found');
        return { message: 'Branch deleted successfully' };
    }
}