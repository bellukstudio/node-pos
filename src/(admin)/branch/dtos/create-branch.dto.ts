import { IsNotEmpty, IsString } from "class-validator";


export class CreateBranchDto{
    @IsNotEmpty() @IsString()
    readonly name: string;

    @IsNotEmpty() @IsString()
    readonly address: string;

    @IsNotEmpty() @IsString()
    readonly city: string;

    @IsNotEmpty() @IsString()
    readonly province: string;

    @IsNotEmpty() @IsString()
    readonly phoneNumber: string;
    
    @IsNotEmpty() @IsString()
    readonly status: boolean;
    
}