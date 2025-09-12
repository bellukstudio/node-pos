import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { AuditLogDto } from './dtos/audit.dto';
import { AuditLogService } from './audit.service';

@Controller('audit-logs')
export class AuditLogController {
    constructor(private readonly auditLogService: AuditLogService) { }

    @Post()
    /**
     * Creates a new audit log.
     *
     * @param dto - The data transfer object containing the new audit log information.
     * @returns {Promise<AuditLogEntity>} The newly created audit log.
     * @throws {NotFoundException} If the user or branch is not found.
     */
    async create(@Body() dto: AuditLogDto) {
        return await this.auditLogService.create(dto);
    }

    @Get()
    /**
     * Retrieves a list of audit logs with pagination and filter functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} module - The module to filter by. Optional.
     * @property {string} action - The action to filter by. Optional.
     * @property {string} search - A search query to filter the audit logs by. Can be used to search for the audit log description. Optional.
     * @returns {Promise<{data: AuditLogEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved audit logs with pagination and filter functionality.
     */
    async findAll(@Query() queries: any) {
        return await this.auditLogService.findAll(queries);
    }

    @Get(':id')
    /**
     * Retrieves an audit log by its ID.
     *
     * @param id - The ID of the audit log to retrieve.
     * @returns {Promise<AuditLogEntity>} The retrieved audit log entity.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async findOne(@Param('id') id: string) {
        return await this.auditLogService.findOne(id);
    }

    @Delete(':id')
    /**
     * Soft deletes an audit log by setting the deleted_at property to the current date and time.
     *
     * @param id - The id of the audit log to delete.
     * @returns {Promise<AuditLogEntity>} The updated audit log entity with deleted_at set.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async delete(@Param('id') id: string) {
        return await this.auditLogService.delete(id);
    }
}
