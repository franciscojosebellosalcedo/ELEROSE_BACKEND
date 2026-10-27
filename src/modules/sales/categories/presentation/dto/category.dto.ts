import { IsNotEmpty, IsString } from "class-validator";

export class SaveCategoryDTO {

    @IsString()
    @IsNotEmpty()
    cate_Nombre!: string;

    @IsString()
    cate_Codigo!: string;
    
}

export class SearchCategoryDTO {

    @IsString()
    name!: string;

}