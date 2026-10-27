import { inject, injectable } from "tsyringe";
import { envConfig } from "../../../config/env/env.config.ts";
import { ERROR_RESPONSE_CODE } from "../../../shared/errors/error.response.code.ts";
import { AppException } from "../../../shared/errors/handler.error.ts";
import { Security } from "../../../shared/security.ts";
import { ROL_TOKENS } from "../../settings/rols/container/rol.tokens.ts";
import type { RolRepository } from "../../settings/rols/domain/repositories/rol.repository.ts";
import { USER_TOKENS } from "../../settings/users/container/user.container.tokens.ts";
import { USER_PERMISSION_TOKENS } from "../../settings/users/container/user.permission.tokens.ts";
import type { UserPermissionRepository } from "../../settings/users/domain/repositories/user.permission.repository.ts";
import type { UserRepository } from "../../settings/users/domain/repositories/user.repository.ts";
import type { TDataAccessToken } from "../types/auth.type.ts";

@injectable()
export class RefressSessionUseCase {

    constructor(
        @inject(USER_TOKENS.REPOSITORY)
        private readonly userRepository: UserRepository,

        @inject(USER_PERMISSION_TOKENS.REPOSITORY)
        private readonly userPermissionRepository: UserPermissionRepository,

        @inject(ROL_TOKENS.REPOSITORY)
        private readonly rolRepository: RolRepository
    ) { }

    execute = async (token: string) => {

        const payloadToken: any = Security.verifyToken(token, envConfig.jwtSecretRefressToken as string);

        const userFound = await this.userRepository.findById( payloadToken.usua_Id );

        if (!userFound) {

            throw new AppException(
                401 , ERROR_RESPONSE_CODE.ERROR_NOT_AUTHORIZED, "No autorizado"
            );

        }

        const payload: TDataAccessToken = {

            usua_Id: userFound.usua_Id as number,
            usua_Codigo: userFound.usua_Codigo,
            usua_Nombre: userFound.usua_Nombre,
            usua_RolId: userFound.usua_RolId

        }

        const accessToken = Security.getToken(payload, envConfig.jwtSecretAccessToken as string);
        const refressToken = Security.getToken(payload, envConfig.jwtSecretRefressToken as string);

        const rol = await this.rolRepository.findById( userFound.usua_RolId );

        const permissions = await this.userPermissionRepository.findByIdUser( userFound.usua_Id ?? 0 );

        const dataResponse = {
            user: payload,
            accessToken,
            permissions,
            rol,
            refressToken
        }

        return dataResponse;
    }
}