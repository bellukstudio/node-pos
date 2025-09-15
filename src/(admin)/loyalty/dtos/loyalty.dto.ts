import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { MemberEntity } from "src/databases/entities/user/member.entity";

export class LoyaltyDto {
    @ApiProperty({
        description: "Referensi ke entitas Member yang mendapatkan poin",
        type: () => MemberEntity,
    })
    @IsNotEmpty()
    readonly member: MemberEntity;

    @ApiProperty({
        description: "Jumlah poin loyalty yang diberikan",
        example: 50,
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    readonly points: number;
}
