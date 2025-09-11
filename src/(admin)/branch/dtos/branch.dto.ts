import { IsNotEmpty, IsString } from "class-validator";


export class BranchDto{
    @IsNotEmpty() @IsString()
    readonly name: string;

    @IsNotEmpty() @IsString()
    readonly address: string;

    @IsNotEmpty() @IsString()
    readonly city: string;

    @IsNotEmpty() @IsString()
    readonly province: string;

    @IsNotEmpty() @IsString()
    readonly phone_number: string;
    
    @IsNotEmpty() @IsString()
    readonly status: boolean;
    
}