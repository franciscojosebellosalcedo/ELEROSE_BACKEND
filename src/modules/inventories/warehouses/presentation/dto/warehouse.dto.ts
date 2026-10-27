import { IsNotEmpty, IsString } from "class-validator";

export class SaveWarehouseDTO {

    @IsString()
    @IsNotEmpty()
    alm_Nombre!: string
    
}

export class SearchWarehouseDTO {

    @IsString()
    name!: string;

}