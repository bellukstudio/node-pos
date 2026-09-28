import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber } from "class-validator";
import { MemberEntity } from "../../../databases/entities/user/member.entity";

export class LoyaltyDto {
    @ApiProperty({
        description: "Referensi ke entitas Member yang mendapatkan poin",
        type: () => MemberEntity,
        example: { id: "123e4567-e89b-12d3-a456-426614174000" },
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
