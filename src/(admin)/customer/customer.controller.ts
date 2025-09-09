import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CustomerService } from "./customer.service";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "src/core/enum/role.enum";
import { Roles } from "src/core/decorators/role.decorator";
import { CreateCustomerDto } from "./dtos/create-customer.dto";
import { UpdateCustomerDto } from "./dtos/update-customer.dto";

@Controller('customer')
@UseGuards(AuthGuard('jwt'))
export class CustomerController {

    constructor(
        private readonly customerService: CustomerService
    ) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)
    /**
     * Finds all customers.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - search: A search query to filter the customers by. Can be used to search for the customer name.
     * @returns An object with the following properties:
     *   - data: An array of MemberEntity objects.
     *   - total: The total number of customers.
     *   - page: The current page number.
     *   - per_page: The number of items per page.
     *   - total_pages: The total number of pages.
     */
    getAll(@Query() queries: any) {
        return this.customerService.getAll(queries);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin, Role.Manager, Role.Supervisor, Role.Cashier)


    /**
     * Finds a customer by id.
     *
     * @param id - The id of the customer to retrieve.
     * @returns The customer entity with the specified id, or a NotFoundException if it is not found.
     */
    getById(@Param('id') id: string) {
        return this.customerService.getById(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Creates a new customer.
     *
     * @param {CreateCustomerDto} dto - The data transfer object containing the new customer information.
     * @returns {Promise<MemberEntity>} The newly created customer entity.
     */
    create(@Body() dto: CreateCustomerDto) {
        return this.customerService.create(dto);

    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)
    /**
     * Updates an existing customer.
     *
     * @param {string} id - The id of the customer to update.
     * @param {UpdateCustomerDto} dto - The data transfer object containing the updated customer information.
     * @returns {Promise<MemberEntity>} The updated customer entity.
     * @throws {NotFoundException} If the customer is not found.
     */
    update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
        return this.customerService.update(id, dto);
    }


    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @Roles(Role.Admin, Role.SuperAdmin)

    /**
     * Deletes a customer by id.
     *
     * @param {string} id - The id of the customer to delete.
     * @returns {Promise<void>} A promise that resolves when the customer has been deleted.
     * @throws {NotFoundException} If the customer is not found.
     */
    delete(@Param('id') id: string) {
        return this.customerService.delete(id);
    }

}