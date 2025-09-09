import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";
import { ILike, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { MemberEntity } from "src/databases/entities/user/member.entity";
import { CreateCustomerDto } from "./dtos/create-customer.dto";

@Injectable()
export class CustomerService {


    constructor(
        @InjectRepository(MemberEntity)
        private readonly memberRepository: Repository<MemberEntity>
    ) { }

    /**
     * Finds all member entities.
     * 
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the members by. Can be used to search for the member name.
     * @returns An object with the following properties:
     *   - data: An array of MemberEntity objects.
     *   - total: The total number of members.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    async getAll(queries: any) {
        const { page = 1, per_page = 0, search = '' } = queries;
        const take = parseInt(page);
        const skip = (parseInt(page) - 1) * take;

        const where = search ? [
            { name: ILike(`%${search}%`) }
        ] : {};

        const [result, total] = await this.memberRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: 'DESC' }
        })

        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: take,
            total_pages: Math.ceil(total / take)
        }
    }

    /**
     * Finds a member entity by id.
     * 
     * @param id - The id of the member to retrieve.
     * @returns The member entity with the specified id, or a NotFoundException if it is not found.
     */
    async getById(id: string) {
        const member = await this.memberRepository.findOne({ where: { id } });

        if (!member) throw new NotFoundException('Member not found');
        return member;
    }

    /**
     * Creates a new customer.
     * 
     * @param {CreateCustomerDto} dto - The data transfer object containing the new customer information.
     * @returns {Promise<MemberEntity>} The newly created customer entity.
     */
    async create(dto: CreateCustomerDto) {
        const member = this.memberRepository.create(dto);
        return this.memberRepository.save(member);
    }

    /**
     * Updates an existing customer.
     * 
     * @param {string} id - The id of the customer to update.
     * @param {UpdateCustomerDto} dto - The data transfer object containing the updated customer information.
     * @returns {Promise<MemberEntity>} The updated customer entity.
     * @throws {NotFoundException} If the customer is not found.
     */
    async update(id: string, dto: UpdateCustomerDto) {
        const member = await this.memberRepository.findOne({ where: { id } });

        if (!member) throw new NotFoundException('Member not found');
        const updated = Object.assign(member, dto);
        return this.memberRepository.save(updated);
    }

    /**
     * Deletes a customer by id.
     * 
     * @param {string} id - The id of the customer to delete.
     * @returns {Promise<void>} A promise that resolves when the customer has been deleted.
     * @throws {NotFoundException} If the customer is not found.
     */
    async delete(id: string) {
        const member = await this.memberRepository.findOne({ where: { id } });

        if (!member) throw new NotFoundException('Member not found');
        return this.memberRepository.remove(member);
    }
}