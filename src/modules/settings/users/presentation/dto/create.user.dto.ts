import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

export class SaveUserPermissionDTO {

    @IsNumber()
    @Min(1)
    peusua_OpcionId!: number;

    @IsBoolean()
    peusua_Crear!: boolean;

    @IsBoolean()
    peusua_Editar!: boolean;

    @IsBoolean()
    peusua_CambiarStatus!: boolean;
}

export class SaveUserDTO {

    @IsString()
    @IsNotEmpty()
    usua_Nombre!: string;

    @IsString()
    @IsNotEmpty()
    usua_NombreUsuario!: string;

    @IsString()
    usua_Contrasenia!: string;

    @IsNumber()
    @Min(1)
    usua_RolId!: number;

}

export class DataSaveUser {

    @ValidateNested()
    @Type(()=> SaveUserDTO)
    user!: SaveUserDTO;

    @ValidateNested()
    @Type(()=> SaveUserPermissionDTO)
    permissions!: SaveUserPermissionDTO[];
    
}