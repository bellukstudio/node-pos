import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/databases/entities/user/users.entity';
import { BranchEntity } from 'src/databases/entities/branch/branch.entity';
import { AuditLogDto } from './dtos/audit.dto';
import { AuditLogEntity } from 'src/databases/entities/audit/log-audit.entity';

@Injectable()
export class AuditLogService {
    /**
     * Constructs an instance of the AuditLogService.
     *
     * @param auditLogRepository - The repository for AuditLogEntity.
     */
    constructor(
        @InjectRepository(AuditLogEntity)
        private readonly auditLogRepository: Repository<AuditLogEntity>,
    ) { }

    /**
     * Creates a new audit log.
     *
     * @param dto - The data transfer object containing the new audit log information.
     * @throws {NotFoundException} If the user or branch is not found.
     * @returns {Promise<AuditLogEntity>} The newly created audit log.
     */
    async create(dto: AuditLogDto) {
        const user = await this.auditLogRepository.manager.findOne(UserEntity, {
            where: { id: dto.user.id },
        });
        if (!user) throw new NotFoundException('User not found');

        const branch = await this.auditLogRepository.manager.findOne(BranchEntity, {
            where: { id: dto.branch.id },
        });
        if (!branch) throw new NotFoundException('Branch not found');

        const log = this.auditLogRepository.create({
            user,
            branch,
            module: dto.module,
            action: dto.action,
            description: dto.description,
            activity_time: new Date(),
            ip_address: dto.ip_address,
            device_info: dto.device_info,
        });

        return await this.auditLogRepository.save(log);
    }

    /**
     * Finds all audit logs.
     *
     * @param queries - An object with the following properties:
     *   - page: The page number to retrieve. Defaults to 1.
     *   - per_page: The number of items per page. Defaults to 10.
     *   - module: The module to filter by. Optional.
     *   - action: The action to filter by. Optional.
     *   - search: A search query to filter the audit logs by. Can be used to search for the audit log description. Optional.
     * @returns {Promise<{data: AuditLogEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved audit logs with pagination and filter functionality.
    **/
    async findAll(queries: any) {
        const { page = 1, per_page = 10, module, action, search } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where: any = {};
        if (module) where.module = module;
        if (action) where.action = action;
        if (search)
            where.description = search ? `%${search}%` : undefined;

        const [data, total] = await this.auditLogRepository.findAndCount({
            where,
            relations: ['user', 'branch'],
            order: { created_at: 'DESC' },
            take,
            skip,
        });

        return {
            data,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take),
        };
    }

    /**
     * Finds a single audit log by id.
     *
     * @param id - The id of the audit log to find.
     * @returns {Promise<AuditLogEntity>} The found audit log entity.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async findOne(id: string) {
        const log = await this.auditLogRepository.findOne({
            where: { id },
            relations: ['user', 'branch'],
        });
        if (!log) throw new NotFoundException('Audit log not found');
        return log;
    }

    /**
     * Soft deletes an audit log by setting the deleted_at property to the current date and time.
     *
     * @param id - The id of the audit log to delete.
     * @returns {Promise<AuditLogEntity>} The updated audit log entity with deleted_at set.
     * @throws {NotFoundException} If the audit log is not found.
     */
    async delete(id: string) {
        const log = await this.findOne(id);
        log.deleted_at = new Date();
        return await this.auditLogRepository.save(log);
    }
}
