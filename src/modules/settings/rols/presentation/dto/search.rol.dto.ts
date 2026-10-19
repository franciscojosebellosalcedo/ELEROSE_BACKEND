import { IsNotEmpty, IsString } from "class-validator";

export class SearchRolDTO {

    @IsString()
    @IsNotEmpty()
    name!: string
    
}