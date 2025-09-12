import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ShiftEntity } from "src/databases/entities/shift/shift.entity";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { ShiftDto } from "./dtos/shift.dto";
import { ShiftActivityLogEntity } from "src/databases/entities/shift/log-shift-activity.entity";
import { ShiftActivityLogDto } from "./dtos/log-shift.dto";

@Injectable()
export class ShiftService {
    constructor(
        @InjectRepository(ShiftEntity)
        private readonly shiftRepository: Repository<ShiftEntity>,
        @InjectRepository(ShiftActivityLogEntity)
        private readonly logRepository: Repository<ShiftActivityLogEntity>,
    ) { }

    /**
     * Retrieves a list of shifts with pagination and filter functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {number} branch - The branch ID to filter by. Optional.
     * @property {number} cashier - The cashier ID to filter by. Optional.
     * @returns {Promise<{data: ShiftEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved shifts with pagination and filter functionality.
     */
    async getAll(queries: any) {
        const { page = 1, per_page = 10, branch, cashier } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where: any = {};
        if (branch) where.branch = { id: branch };
        if (cashier) where.cashier = { id: cashier };

        const [result, total] = await this.shiftRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: "DESC" },
            relations: ["branch", "cashier"],
        });

        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take)
        };
    }

    /**
     * Retrieves a shift by its ID.
     *
     * @param id - The ID of the shift to retrieve.
     * @returns {Promise<ShiftEntity>} The retrieved shift.
     * @throws {NotFoundException} If the shift is not found.
     */
    async getById(id: string) {
        const shift = await this.shiftRepository.findOne({
            where: { id },
            relations: ["branch", "cashier"],
        });
        if (!shift) throw new NotFoundException("Shift not found");
        return shift;
    }

    /**
     * Opens a new shift for a branch and cashier.
     *
     * @param dto - The data transfer object containing the new shift information.
     * @returns {Promise<ShiftEntity>} The newly created shift entity.
     * @throws {NotFoundException} If the branch or cashier is not found.
     */
    async openShift(dto: ShiftDto) {
        const branch = await this.shiftRepository.manager.findOne(BranchEntity, {
            where: { id: dto.branch.id },
        });
        if (!branch) throw new NotFoundException("Branch not found");

        const cashier = await this.shiftRepository.manager.findOne(UserEntity, {
            where: { id: dto.cashier.id },
        });
        if (!cashier) throw new NotFoundException("Cashier not found");

        const shift = this.shiftRepository.create({
            branch,
            cashier,
            time_in: dto.time_in,
            opening_cash: dto.opening_cash || 0,
            shift_status: "active",
        });

        return await this.shiftRepository.save(shift);
    }

    /**
     * Closes an existing shift.
     *
     * @param id - The id of the shift to close.
     * @param dto - The data transfer object containing the updated shift information.
     * @returns {Promise<ShiftEntity>} The updated shift entity.
     * @throws {NotFoundException} If the shift is not found.
     */
    async closeShift(id: string, dto: ShiftDto) {
        const shift = await this.getById(id);

        const updated = this.shiftRepository.merge(shift, {
            time_out: dto.time_out,
            total_sales: dto.total_sales,
            total_transactions: dto.total_transactions,
            closing_cash: dto.closing_cash,
            shift_note: dto.shift_note,
            shift_status: dto.shift_status || "closed",
        });

        return await this.shiftRepository.save(updated);
    }


    /**
     * Retrieves a list of shift activity logs with pagination and filter functionality.
     *
     * @param queries - An object containing the query parameters.
     * @property {number} page - The page number to retrieve. Defaults to 1.
     * @property {number} per_page - The number of items per page. Defaults to 10.
     * @property {string} shift_id - The shift ID to filter by. Optional.
     * @property {string} activity_type - The activity type to filter by. Optional.
     * @returns {Promise<{data: ShiftActivityLogEntity[], total: number, page: number, per_page: number, total_pages: number}>} The retrieved shift activity logs with pagination and filter functionality.
    **/
    async getAllLog(queries: any) {
        const { page = 1, per_page = 10, shift_id, activity_type } = queries;
        const take = parseInt(per_page);
        const skip = (parseInt(page) - 1) * take;

        const where: any = {};
        if (shift_id) where.shift = { id: shift_id };
        if (activity_type) where.activity_type = activity_type;

        const [result, total] = await this.logRepository.findAndCount({
            where,
            take,
            skip,
            order: { created_at: "DESC" },
            relations: ["shift"],
        });

        return {
            data: result,
            total,
            page: parseInt(page),
            per_page: parseInt(per_page),
            total_pages: Math.ceil(total / take),
        };
    }

    /**
     * Retrieves a shift activity log by its ID.
     *
     * @param id - The ID of the shift activity log to retrieve.
     * @returns {Promise<ShiftActivityLogEntity>} The retrieved shift activity log.
     * @throws {NotFoundException} If the shift activity log is not found.
     */
    async getByIdLog(id: string) {
        const log = await this.logRepository.findOne({
            where: { id },
            relations: ["shift"],
        });
        if (!log) throw new NotFoundException("Activity log not found");
        return log;
    }

    /**
     * Creates a new shift activity log.
     *
     * @param dto - The data transfer object containing the new shift activity log information.
     * @returns {Promise<ShiftActivityLogEntity>} The newly created shift activity log.
     * @throws {NotFoundException} If the shift is not found.
     */
    async createLog(dto: ShiftActivityLogDto) {
        const shift = await this.logRepository.manager.findOne(ShiftEntity, {
            where: { id: dto.shift.id },
        });
        if (!shift) throw new NotFoundException("Shift not found");

        const log = this.logRepository.create({
            shift,
            activity_type: dto.activity_type,
            description: dto.description,
            activity_time: dto.activity_time || new Date(),
        });

        return await this.logRepository.save(log);
    }
}
