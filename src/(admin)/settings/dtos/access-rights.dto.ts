import { IsEnum, IsNotEmpty } from "class-validator";
import { UserEntity } from "src/databases/entities/user/users.entity";

export class AccessRightDto {
    @IsNotEmpty()
    readonly user: UserEntity;

    @IsNotEmpty()
    readonly branch: string

    @IsNotEmpty()
    @IsEnum([
        "product", "report", "customer", "audit", "branch",
        "program", "sales", "setting", "shift", "supply", "stock", "user"
    ], { each: true })
    readonly modules: (
        | "product" | "report" | "customer" | "audit" | "branch"
        | "program" | "sales" | "setting" | "shift" | "supply" | "stock" | "user"
    )[];

    @IsNotEmpty()
    @IsEnum(["create", "read", "update", "delete"])
    readonly action: "create" | "read" | "update" | "delete";
}