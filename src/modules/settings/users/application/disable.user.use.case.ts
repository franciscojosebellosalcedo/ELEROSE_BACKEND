import { inject, injectable } from "tsyringe";
import { USERS_CODE } from "../../../../shared/constant.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { USER_RESPONSE_CODE } from "../../../../shared/reseponse/user.response.code.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";
import type { UserRepository } from "../domain/repositories/user.repository.ts";

@injectable()
export class DisableUserUseCase {

    constructor(

        @inject(USER_TOKENS.REPOSITORY)
        private readonly userRepository: UserRepository
    ) { }

    async execute(id: number, idCurrentUser: number) {

        if (!id) {

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador no valido para deshabilitar usuario"
            );

        }

        const userFound = await this.userRepository.findById(id);

        if (!userFound) {

            throw new AppException(
                404,
                USER_RESPONSE_CODE.USER_NOT_FOUND,
                "Usuario no encontrado"
            );

        }

        if (!userFound.usua_Activo) {

            throw new AppException(
                400,
                USER_RESPONSE_CODE.USER_IS_READY_DISABLE,
                "Usuario actualmente deshabilitado"
            );

        };

        const isUserSystem = [USERS_CODE.ADMIN, USERS_CODE.SYSTEM].includes( userFound.usua_Codigo );
        if( isUserSystem ){

            throw new AppException(
                400,
                USER_RESPONSE_CODE.USER_NOT_PERMIT_UPDATE,
                "No está permitido modificar este usuario"
            );

        }

        return await this.userRepository.disable( id , idCurrentUser );

    }

}