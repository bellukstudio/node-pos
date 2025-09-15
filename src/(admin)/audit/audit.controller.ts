import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuditLogDto } from './dtos/audit.dto';
import { AuditLogService } from './audit.service';
import { AuditLogEntity } from 'src/databases/entities/audit/log-audit.entity';
import { RolesGuard } from 'src/core/guard/role.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Audit Logs')
@ApiBearerAuth()
@Controller('audit-logs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AuditLogController {
    constructor(private readonly auditLogService: AuditLogService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new audit log' })
    @ApiBody({ type: AuditLogDto })
    @ApiResponse({ status: 201, description: 'Audit log created successfully', type: AuditLogEntity })
    @ApiResponse({ status: 404, description: 'User or branch not found' })
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
    @ApiOperation({ summary: 'Get paginated list of audit logs' })
    @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
    @ApiQuery({ name: 'per_page', required: false, type: Number, example: 10 })
    @ApiQuery({ name: 'module', required: false, type: String, example: 'product' })
    @ApiQuery({ name: 'action', required: false, type: String, example: 'create' })
    @ApiQuery({ name: 'search', required: false, type: String, example: 'update stock' })
    @ApiResponse({
        status: 200,
        description: 'List of audit logs with pagination',
        schema: {
            example: {
                data: [
                    {
                        id: 'uuid',
                        module: 'product',
                        action: 'create',
                        description: 'Created new product',
                        created_at: '2025-09-12T12:00:00Z',
                        user: {
                            id: 'uuid',
                            name: 'John Doe',
                        }
                    }
                ],
                total: 1,
                page: 1,
                per_page: 10,
                total_pages: 1
            }
        }
    })
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
    async findAll(@Query() queries: Record<string, any>) {
        return await this.auditLogService.findAll(queries);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get audit log by ID' })
    @ApiParam({ name: 'id', description: 'UUID of the audit log', type: String })
    @ApiResponse({ status: 200, description: 'Audit log retrieved successfully', type: AuditLogEntity })
    @ApiResponse({ status: 404, description: 'Audit log not found' })
    /**
     * Retrieves a single audit log by its ID.
     *
     * @param id - The ID of the audit log to retrieve.
     * @returns {Promise<AuditLogEntity>} The retrieved audit log.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async findOne(@Param('id') id: string) {
        return await this.auditLogService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Soft delete audit log' })
    @ApiParam({ name: 'id', description: 'UUID of the audit log', type: String })
    @ApiResponse({ status: 200, description: 'Audit log soft deleted successfully', type: AuditLogEntity })
    @ApiResponse({ status: 404, description: 'Audit log not found' })
    /**
     * Soft deletes an audit log by setting the deleted_at property to the current date and time.
     *
     * @param id - The ID of the audit log to delete.
     * @returns {Promise<AuditLogEntity>} The updated audit log entity with deleted_at set.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async delete(@Param('id') id: string) {
        return await this.auditLogService.delete(id);
    }
}
