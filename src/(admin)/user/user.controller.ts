import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { UserService } from "./user.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";


@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
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
    getAll(@Query() queries: any) {
        return this.userService.getAll(queries);
    }


    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Finds a user by id.
     *
     * @param {string} id - The id of the user to find.
     * @returns {Promise<UserEntity>} The found user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    getById(@Param('id') id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    /**
     * Creates a new user.
     *
     * @param {CreateUserDto} dto - The data transfer object containing the new user information.
     * @returns {Promise<UserEntity>} The newly created user entity.
     */
    create(@Body() dto: CreateUserDto) {
        return this.userService.create(dto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Updates an existing user.
     *
     * @param {string} id - The id of the user to update.
     * @param {UpdateUserDto} dto - The data transfer object containing the updated user information.
     * @returns {Promise<UserEntity>} The updated user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
        return this.userService.update(id, dto);
    }
    

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    /**
     * Deletes a user.
     *
     * @param {string} id - The id of the user to delete.
     * @returns {Promise<void>} A promise that resolves when the user has been deleted.
     * @throws {NotFoundException} If the user is not found.
     */
    delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}