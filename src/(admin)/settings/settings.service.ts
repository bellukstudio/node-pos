import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GeneralSettingEntity } from "src/databases/entities/setting/general-setting.entity";
import { UserAccessRightsEntity } from "src/databases/entities/setting/user-access-rights.entity";
import { Repository } from "typeorm";
import { GeneralSettingDto } from "./dtos/setting.dto";
import { AccessRightDto } from "./dtos/access-rights.dto";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

@Injectable()
export class SettingsService {

    /**
     * Service constructor
     *
     * @param generalSettingRepository - injected repository for GeneralSettingEntity
     * @param userAccessRightsRepository - injected repository for UserAccessRightsEntity
     */
    constructor(
        @InjectRepository(GeneralSettingEntity)
        private readonly generalSettingRepository: Repository<GeneralSettingEntity>,
        @InjectRepository(UserAccessRightsEntity)
        private readonly userAccessRightsRepository: Repository<UserAccessRightsEntity>,
    ) { }


    /**
     * Retrieves the general setting.
     *
     * @throws {NotFoundException} If setting not found
     * @returns {Promise<GeneralSettingEntity>} The general setting
     */
    async getGeneralSetting() {
        const setting = await this.generalSettingRepository.findOne({});
        if (!setting) throw new NotFoundException('Setting not found');
        return setting
    }

    /**
     * Retrieves the user access rights.
     *
     * @param userId - The user id
     * @param branchId - The branch id (optional)
     * @throws {NotFoundException} If the access rights are not found
     * @returns {Promise<UserAccessRightsEntity[]>} The user access rights
     */
    async getUserRights(userId: string, branchId?: string) {
        const where: any = { user: { id: userId } };

        if (branchId) {
            where.branch = { id: branchId };
        }

        const rights = await this.userAccessRightsRepository.find({
            where,
            relations: ["user", "branch"],
        });

        if (!rights.length) {
            throw new NotFoundException("User access rights not found");
        }

        return rights;
    }

    /**
     * Retrieves the user access rights for a module.
     *
     * @param userId - The user id
     * @param module - The module name
     * @param action - The action name
     * @throws {NotFoundException} If the user access right is not found
     * @returns {Promise<UserAccessRightsEntity | null>} The user access right
     */
    async getUserRightForModule(
        userId: string,
        module:
            | "product" | "report" | "customer" | "audit" | "branch"
            | "program" | "sales" | "setting" | "shift" | "supply" | "stock" | "user",
        action: "create" | "read" | "update" | "delete"
    ) {
        return await this.userAccessRightsRepository
            .createQueryBuilder("uar")
            .leftJoinAndSelect("uar.branch", "branch")
            .where("uar.user_id = :userId", { userId })
            .andWhere(":module = ANY(uar.modules)", { module })
            .andWhere("uar.action = :action", { action })
            .getOne();
    }


    /**
     * Creates a new user access right.
     *
     * @param dto - The data transfer object containing the new user access right information
     * @throws {NotFoundException} If the user or branch is not found
     * @returns {Promise<UserAccessRightsEntity>} The newly created user access right
     */
    async createUserAccessRight(dto: AccessRightDto) {
        const user = await this.userAccessRightsRepository.manager.findOne(UserEntity, {
            where: { id: dto.user.id },
        });
        if (!user) throw new NotFoundException("User not found");

        const branch = await this.userAccessRightsRepository.manager.findOne(BranchEntity, {
            where: { id: dto.branch },
        });
        if (!branch) throw new NotFoundException("Branch not found");

        const accessRight = this.userAccessRightsRepository.create({
            user,
            branch,
            modules: dto.modules,
            action: dto.action,
        });

        return await this.userAccessRightsRepository.save(accessRight);
    }

    /**
     * Updates an existing user access right.
     *
     * @param id - The id of the user access right to update
     * @param dto - The data transfer object containing the updated user access right information
     * @throws {NotFoundException} If the user access right is not found
     * @returns {Promise<UserAccessRightsEntity>} The updated user access right
     */
    async updateUserAccessRight(id: string, dto: AccessRightDto) {
        const existing = await this.userAccessRightsRepository.findOne({
            where: { id },
            relations: ["user", "branch"],
        });

        if (!existing) throw new NotFoundException("Access right not found");

        const updated = this.userAccessRightsRepository.merge(existing, {
            modules: dto.modules,
            action: dto.action,
        });

        return await this.userAccessRightsRepository.save(updated);
    }
    /**
     * Saves the general setting.
     *
     * If the setting already exists, it will be updated. Otherwise, a new setting will be created.
     *
     * @param dto - The data transfer object containing the setting information
     * @returns {Promise<GeneralSettingEntity>} The saved general setting
     */
    async saveGeneralSetting(dto: GeneralSettingDto) {
        let setting = await this.generalSettingRepository.findOne({});

        if (setting) {
            this.generalSettingRepository.merge(setting, dto);
        } else {
            setting = this.generalSettingRepository.create(dto);
        }

        return await this.generalSettingRepository.save(setting);
    }


}