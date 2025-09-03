import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryProductDto{

    @IsNotEmpty() @IsString()
    readonly name: string

    @IsNotEmpty() @IsString()
    readonly description: string
    
}