import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { UserEntity } from "src/databases/entities/user/users.entity";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

export enum ModuleAccess {
    PRODUCT = "product",
    REPORT = "report",
    CUSTOMER = "customer",
    AUDIT = "audit",
    BRANCH = "branch",
    PROGRAM = "program",
    SALES = "sales",
    SETTING = "setting",
    SHIFT = "shift",
    SUPPLY = "supply",
    STOCK = "stock",
    USER = "user"
}

export enum AccessAction {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete"
}

export class AccessRightDto {
    @ApiProperty({ description: "User yang diberikan akses", type: () => UserEntity })
    @IsNotEmpty()
    readonly user: UserEntity;

    @ApiProperty({ description: "Cabang di mana akses berlaku", type: () => BranchEntity })
    @IsNotEmpty()
    readonly branch: BranchEntity;

    @ApiProperty({
        description: "Daftar modul yang boleh diakses",
        isArray: true,
        enum: ModuleAccess,
        example: [ModuleAccess.PRODUCT, ModuleAccess.REPORT]
    })
    @IsNotEmpty()
    @IsEnum(ModuleAccess, { each: true })
    readonly modules: ModuleAccess[];

    @ApiProperty({
        description: "Jenis aksi yang diizinkan",
        enum: AccessAction,
        example: AccessAction.READ
    })
    @IsNotEmpty()
    @IsEnum(AccessAction)
    readonly action: AccessAction;
}
