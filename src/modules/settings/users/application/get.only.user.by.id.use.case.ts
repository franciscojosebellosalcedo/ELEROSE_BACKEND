import { inject, injectable } from "tsyringe";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { USER_RESPONSE_CODE } from "../../../../shared/reseponse/user.response.code.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";
import type { UserRepository } from "../domain/repositories/user.repository.ts";

@injectable()
export class GetOnlyUserByIdUseCase {

    constructor(

        @inject( USER_TOKENS.REPOSITORY )
        private readonly userRepository: UserRepository,

    ){}

    async execute( id: number ){

        if(!id){
            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador incorrecto"
            );
        };

        const userFound = await this.userRepository.findById( id );
        if(!userFound){
            throw new AppException(
                404,
                USER_RESPONSE_CODE.USER_NOT_FOUND,
                "Usuario no encontrado"
            );
        };

        return userFound

    }

}