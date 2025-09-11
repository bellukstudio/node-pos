import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { SupplyManagementEntity } from "src/databases/entities/supply/supply-management.entity";
import { ILike, Repository } from "typeorm";
import { SupplierDto } from "./dtos/supplier.dto";

@Injectable()
export class SupplierService {

    /**
     * Injects the supplier management repository.
     * @param supplierRepository - The supplier management repository.
     */
    constructor(
        @InjectRepository(SupplyManagementEntity)
        private readonly supplierRepository: Repository<SupplyManagementEntity>
    ) { }

    /**
     * Finds all supplier management entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the supplier managements by. Can be used to search for the supplier management name.
     * @returns An object with the following properties:
     *   - data: An array of SupplierManagementEntity objects.
     *   - total: The total number of supplier managements.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     * 
     * */

    async getAll(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { supplier_name: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.supplierRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        })

        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take)
        }


    }
    /**
     * Finds a supplier by id.
     *
     * @param {string} id - The id of the supplier to find.
     * @returns {Promise<SupplierEntity>} The found supplier entity.
     * @throws {NotFoundException} If the supplier is not found.
     */
    async getById(id: string) {
        const supplier = await this.supplierRepository.findOneBy({ id });
        if (!supplier) throw new NotFoundException('Supplier not found');
        return supplier

    }
    /**
     * Creates a new supplier management entity.
     * 
     * @param {SupplierDto} dto - The data transfer object containing the new supplier management information.
     * @returns {Promise<SupplierManagementEntity>} The newly created supplier management entity.
     */
    async create(dto: SupplierDto) {
        const supplier = this.supplierRepository.create(dto);
        return this.supplierRepository.save(supplier);
    }
    /**
     * Updates an existing supplier management entity.
     *
     * @param {string} id - The id of the supplier management to update.
     * @param {SupplierDto} dto - The data transfer object containing the updated supplier management information.
     * @returns {Promise<SupplierManagementEntity>} The updated supplier management entity.
     * @throws {NotFoundException} If the supplier management is not found.
     */
    async update(id: string, dto: SupplierDto) {
        const supplier = await this.supplierRepository.findOneBy({ id });
        if (!supplier) throw new NotFoundException('Supplier not found');
        const updated = Object.assign(supplier, dto);
        return this.supplierRepository.save(updated);
    }
    /**
     * Deletes a supplier management entity.
     *
     * @param {string} id - The id of the supplier management to delete.
     * @returns {Promise<void>} The result of the deletion operation.
     * @throws {NotFoundException} If the supplier management is not found.
     */
    async delete(id: string) {
        const supplier = await this.supplierRepository.findOneBy({ id });
        if (!supplier) throw new NotFoundException('Supplier not found');
        return this.supplierRepository.remove(supplier);
    }
}