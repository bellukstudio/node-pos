import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryProductDto{

    @IsNotEmpty() @IsString()
    readonly name: string

    @IsNotEmpty() @IsString()
    readonly description: string
    
}