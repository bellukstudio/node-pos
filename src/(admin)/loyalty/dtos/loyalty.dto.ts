import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { MemberEntity } from "src/databases/entities/user/member.entity";

export class LoyaltyDto {

    @IsNotEmpty()
    readonly member: MemberEntity

    @IsNotEmpty() @Type(() => Number) @IsNumber()
    readonly points: number

}