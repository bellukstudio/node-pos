import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "src/core/guard/role.guard";
import { UserService } from "./user.service";
import { Roles } from "src/core/decorators/role.decorator";
import { Role } from "src/core/enum/role.enum";
import { UserDto } from "./dtos/user.dto";
import {
    ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags
} from "@nestjs/swagger";

@ApiTags("Users")
@ApiBearerAuth()
@Controller()
@UseGuards(AuthGuard("jwt"), RolesGuard)
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({ summary: "Get all users with pagination & search" })
    @ApiQuery({ name: "page", required: false, type: Number, example: 1 })
    @ApiQuery({ name: "per_page", required: false, type: Number, example: 10 })
    @ApiQuery({ name: "search", required: false, type: String, example: "John" })
    @ApiResponse({ status: 200, description: "List of users retrieved successfully" })
    /**
     * Retrieves a list of users with pagination and search functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} search - A search query to filter the users by. Can be used to search for the user name, email, or phone.
     * @returns {Promise<{data: UserEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved users with pagination and search functionality.
     */
    getAll(@Query() queries: any) {
        return this.userService.getAll(queries);
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({ summary: "Get user by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "User retrieved successfully" })
    /**
     * Retrieves a user by its ID.
     *
     * @param id The ID of the user to retrieve.
     * @returns The retrieved user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    getById(@Param("id") id: string) {
        return this.userService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin)
    @ApiOperation({ summary: "Create new user" })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: 201, description: "User created successfully" })
    /**
     * Create a new user.
     *
     * @param dto - The data transfer object containing the new user information.
     * @returns The newly created user entity.
     */
    create(@Body() dto: UserDto) {
        return this.userService.create(dto);
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({ summary: "Update existing user" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiBody({ type: UserDto })
    @ApiResponse({ status: 200, description: "User updated successfully" })
    /**
     * Updates an existing user.
     *
     * @param id - The id of the user to update.
     * @param dto - The data transfer object containing the updated user information.
     * @returns The updated user entity.
     * @throws {NotFoundException} If the user is not found.
     */
    update(@Param("id") id: string, @Body() dto: UserDto) {
        return this.userService.update(id, dto);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin)
    @ApiOperation({ summary: "Delete user by ID" })
    @ApiParam({ name: "id", type: String, example: "uuid-123" })
    @ApiResponse({ status: 200, description: "User deleted successfully" })
    /**
     * Deletes a user by ID.
     * @param {string} id The ID of the user to delete.
     * @returns {Promise<void>} A promise that resolves when the user has been deleted.
     * @throws {NotFoundException} If the user is not found.
     */
    delete(@Param("id") id: string) {
        return this.userService.delete(id);
    }
}
