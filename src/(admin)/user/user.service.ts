import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { ILike, Repository } from "typeorm";
import { UserDto } from "./dtos/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    /**
     * Finds all users.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the users by. Can be used to search for the user name, email, or phone.
     * @returns An object with the following properties:
     *   - data: An array of UserEntity objects.
     *   - total: The total number of users.
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
                { email: ILike(`%${search}%`) },
                { phone: ILike(`%${search}%`) },
                { role: ILike(`%${search}%`) },
            ]
            : {};

        const [result, total] = await this.userRepository.findAndCount({
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
     * Finds a user by id.
     *
     * @param {string} id - The id of the user to find.
     * @returns {Promise<UserEntity>} The found user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    async getById(id: string) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    /**
     * Creates a new user.
     *
     * @param {UserDto} dto - The data transfer object containing the new user information.
     * @returns {Promise<UserEntity>} The newly created user entity.
     */
    async create(dto: UserDto) {
        const user = this.userRepository.create(dto);
        return this.userRepository.save(user);
    }

    /**
     * Updates an existing user.
     *
     * @param {string} id - The id of the user to update.
     * @param {UserDto} dto - The data transfer object containing the updated user information.
     * @returns {Promise<UserEntity>} The updated user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    async update(id: string, dto: UserDto) {
        const user = await this.userRepository.findOneBy({ id });
        if (!user) throw new NotFoundException('User not found');
        const update = Object.assign(user, dto);
        return this.userRepository.save(update);

    }

    /**
     * Deletes a user.
     *
     * @param {string} id - The id of the user to delete.
     * @returns {Promise<void>} A promise that resolves when the user has been deleted.
     * @throws {NotFoundException} If the user is not found.
     */
    async delete(id: string) {
        const user = await this.userRepository.softDelete(id);
        if (!user) throw new NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
}
