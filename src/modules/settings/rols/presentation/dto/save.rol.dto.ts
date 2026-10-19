import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from "class-validator";

export class SaveRolDTO {

    @IsString()
    @IsNotEmpty()
    rol_Nombre!: string

    @IsString()
    @IsOptional()
    rol_Descripcion!: string
}

export class SaveRolPermissionDTO {

    @IsNumber()
    @Min(1)
    perol_OpcionId!: number;

    @IsBoolean()
    perol_Crear!: boolean;

    @IsBoolean()
    perol_Editar!: boolean;

    @IsBoolean()
    perol_CambiarStatus!: boolean;
}

export class DataSaveRolDTO {

    @ValidateNested()
    @Type(() => SaveRolDTO)
    rol!: SaveRolDTO;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SaveRolPermissionDTO)
    permissions!: SaveRolPermissionDTO[];

}