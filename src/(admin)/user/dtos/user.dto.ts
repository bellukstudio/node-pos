import { IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/core/enum/role.enum";
import { BranchEntity } from "src/databases/entities/branch/branch.entity";

export class UserDto {
    @IsNotEmpty() @IsString() readonly name: string;
    @IsNotEmpty() @IsString() readonly email: string;
    @IsNotEmpty() @IsString() readonly phone: string;
    @IsNotEmpty() @IsString() readonly password: string;
    @IsNotEmpty() @IsString() readonly role: Role;
    @IsNotEmpty() @IsString() readonly status: string;
    @IsNotEmpty() @IsString() readonly branch: BranchEntity;
    
}