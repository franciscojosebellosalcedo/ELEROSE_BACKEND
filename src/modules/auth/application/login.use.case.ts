import { inject, injectable } from "tsyringe";
import { envConfig } from "../../../config/env/env.config.ts";
import { AppException } from "../../../shared/errors/handler.error.ts";
import { AUTH_RESPONSE_CODE } from "../../../shared/reseponse/auth.response.code.ts";
import { USER_RESPONSE_CODE } from "../../../shared/reseponse/user.response.code.ts";
import { Security } from "../../../shared/security.ts";
import { ROL_TOKENS } from "../../settings/rols/container/rol.tokens.ts";
import type { RolRepository } from "../../settings/rols/domain/repositories/rol.repository.ts";
import { USER_TOKENS } from "../../settings/users/container/user.container.tokens.ts";
import { USER_PERMISSION_TOKENS } from "../../settings/users/container/user.permission.tokens.ts";
import type { UserPermissionRepository } from "../../settings/users/domain/repositories/user.permission.repository.ts";
import type { UserRepository } from "../../settings/users/domain/repositories/user.repository.ts";
import type { TDataAccessToken, TLogin } from "../types/auth.type.ts";

@injectable()
export class LoginUseCase {

    constructor(

        @inject(USER_TOKENS.REPOSITORY)
        private readonly userRepository: UserRepository,

        @inject(ROL_TOKENS.REPOSITORY)
        private readonly rolRepository: RolRepository,

        @inject(USER_PERMISSION_TOKENS.REPOSITORY)
        private readonly userPermissionRepository: UserPermissionRepository,

    ){}

    execute = async ( values: TLogin ) =>{
        
        const userFound = await this.userRepository.findByNameUser( values.usua_NombreUsuario );

        if(!userFound){

            throw new AppException( 404, AUTH_RESPONSE_CODE.AUTH_CREDENTIALS_NOT_VALID, "Credenciales incorrectas" );

        };

        if(!userFound.usua_Activo){

            throw new AppException( 400, USER_RESPONSE_CODE.USER_DISABLE, "Usuario actualmente deshabilitado" );

        }

        const passwordHash = userFound.usua_Contrasenia;

        const validPassword = Security.comparePassword( values.usua_Contrasenia , passwordHash );

        if(!validPassword){

            throw new AppException( 400, AUTH_RESPONSE_CODE.AUTH_CREDENTIALS_NOT_VALID, "Credenciales incorrectas" );

        }

        const payload: TDataAccessToken = {

            usua_Id: userFound.usua_Id as number,
            usua_Codigo: userFound.usua_Codigo,
            usua_Nombre: userFound.usua_Nombre,
            usua_RolId: userFound.usua_RolId

        }
        
        const accessToken = Security.getToken( payload , envConfig.jwtSecretAccessToken as string );
        const refressToken = Security.getToken( payload , envConfig.jwtSecretRefressToken as string );

        const rol = await this.rolRepository.findById( userFound.usua_RolId );

        const permissions = await this.userPermissionRepository.findByIdUser( userFound.usua_Id ?? 0 );

        const dataResponse = {
            user: payload,
            accessToken,
            rol,
            permissions,
            refressToken
        }

        return dataResponse;

    }
}