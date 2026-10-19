import { inject, injectable } from "tsyringe";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import { ROL_TOKENS } from "../container/rol.tokens.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { ROL_RESPONSE_CODE } from "../../../../shared/reseponse/rol.response.code.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { ROLS_CODE } from "../../../../shared/constant.ts";

@injectable()
export class DisableRolUseCase {

    constructor(

        @inject(ROL_TOKENS.REPOSITORY)
        private readonly rolRepository: RolRepository

    ){}

    async execute( id: number , idUser: number){

        if( !id ){

            throw new AppException(
                400,
                ROL_RESPONSE_CODE.ROL_IDENTIFIED_NOT_VALID,
                "Se require id de rol"
            );

        }

        if( !idUser ){

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_ID_USER_REQUIERED,
                "Se require id de usuario",
            );

        }

        const rolFound = await this.rolRepository.findById( id );

        if(!rolFound){

            throw new AppException(
                404,
                ROL_RESPONSE_CODE.ROL_NOT_FOUND,
                "Rol no encontrado"
            );

        }

        const isRolSystem = rolFound.rol_Codigo === ROLS_CODE.ADMIN;
        if( isRolSystem ){

            throw new AppException(
                400,
                ROL_RESPONSE_CODE.ROL_NOT_PERMIT_UPDATE,
                "No está permitido modificar este rol"
            );
            
        }

        if( !rolFound.rol_Activo ){

            throw new AppException(
                404,
                ROL_RESPONSE_CODE.ROL_IS_READY_DISABLE,
                "Rol actualmente deshabilitado"
            );

        }

        return await this.rolRepository.disable( id , idUser );

    }

}