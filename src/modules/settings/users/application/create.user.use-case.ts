import { inject, injectable } from "tsyringe";
import { DATABASE_TOKENS } from "../../../../shared/database/database.container.tokens.ts";
import type { IUnitOfWork } from "../../../../shared/database/unit.of.work.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { USER_RESPONSE_CODE } from "../../../../shared/reseponse/user.response.code.ts";
import { Security } from "../../../../shared/security.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";
import type { UserRepository } from "../domain/repositories/user.repository.ts";
import type { TCreateUserPermission, TDataCreateUser } from "../types/user.type.ts";
import type { UserPermissionRepository } from "../domain/repositories/user.permission.repository.ts";
import { USER_PERMISSION_TOKENS } from "../container/user.permission.tokens.ts";

@injectable()
export class CreateUserUseCase {

    constructor(
        @inject( DATABASE_TOKENS.UNIT_OF_WORK )
        private readonly unitOfWork: IUnitOfWork
    ){

    }

    async execute( values: TDataCreateUser, idUser: number ){

        return this.unitOfWork.execute( async (context) =>{

            const userRepository: UserRepository = context.resolve( USER_TOKENS.REPOSITORY );

            const userPermissionRepository: UserPermissionRepository = context.resolve( USER_PERMISSION_TOKENS.REPOSITORY );

            const {user } = values;

            const exist = await userRepository.findByNameUser( user.usua_NombreUsuario );

            if(exist){
                throw new AppException( 400, USER_RESPONSE_CODE.USER_EXIST, "Usuario ya existente");
            }

            const passwordHash = Security.hasPassword( user.usua_Contrasenia );

            user.usua_Contrasenia = passwordHash;

            const userCreated = await userRepository.create({
                ...user,
                usua_CreacionId: idUser
            });

            const permissions: TCreateUserPermission[] = values.permissions.map((p) => ({
                ...p,
                peusua_CreacionId: idUser,
                peusua_UsuarioId: userCreated.usua_Id ?? 0
            }))

            const permissionsCreated = await userPermissionRepository.create( permissions );

            return {
                user: userCreated,
                permissions: permissionsCreated
            }
            
        })
    }
}