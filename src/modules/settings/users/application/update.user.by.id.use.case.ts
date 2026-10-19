import { inject, injectable } from "tsyringe";
import { DATABASE_TOKENS } from "../../../../shared/database/database.container.tokens.ts";
import type { IUnitOfWork } from "../../../../shared/database/unit.of.work.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { USER_RESPONSE_CODE } from "../../../../shared/reseponse/user.response.code.ts";
import { Security } from "../../../../shared/security.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";
import { USER_PERMISSION_TOKENS } from "../container/user.permission.tokens.ts";
import type { UserPermissionRepository } from "../domain/repositories/user.permission.repository.ts";
import type { UserRepository } from "../domain/repositories/user.repository.ts";
import type { TDataCreateUser, TUpdateUserPermission } from "../types/user.type.ts";

@injectable()
export class UpdateUserByIdUseCase {

    constructor(

        @inject( DATABASE_TOKENS.UNIT_OF_WORK )
        private readonly unitOfWork: IUnitOfWork

    ){}

    async execute( id: number , values: TDataCreateUser , idCurrentUser: number ){
        return await this.unitOfWork.execute( async (context) => {

            const userRepository: UserRepository = context.resolve( USER_TOKENS.REPOSITORY );

            const userPermissionRepository: UserPermissionRepository = context.resolve( USER_PERMISSION_TOKENS.REPOSITORY );

            if(!id){

                throw new AppException(
                    400,
                    ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                    "Identificador incorrecto"
                );

            }

            const userFound = await userRepository.findById( id );

            if(!userFound){

                throw new AppException(
                    404,
                    USER_RESPONSE_CODE.USER_NOT_FOUND,
                    "Usuario no encontrado"
                );

            }

            const exist = await userRepository.findByNameExludeId( values.user.usua_NombreUsuario, id );

            if(exist){

                throw new AppException(
                    400,
                    USER_RESPONSE_CODE.USER_EXIST,
                    "Usuario ya existente"
                );

            };

            const passwordHash = Security.hasPassword( values.user.usua_Contrasenia );

            const userUpdated = await userRepository.update( id , {

                ...values.user,
                usua_Contrasenia: values.user.usua_Contrasenia.trim() ? passwordHash : userFound.usua_Contrasenia,
                usua_ModificacionId: idCurrentUser

            } );

            if(!userUpdated){

                throw new AppException(
                    400,
                    USER_RESPONSE_CODE.USER_ERROR_UPDATE,
                    "Error al editar usuario"
                );

            };

            const listPermissions : TUpdateUserPermission[] = values.permissions.map((p) => ({
                ...p,
                peusua_ModificacionId: idCurrentUser
            }));

            const permissions = await userPermissionRepository.update( id, listPermissions, idCurrentUser );

            return {
                user: userUpdated,
                permissions: permissions
            }

        });
    }
}