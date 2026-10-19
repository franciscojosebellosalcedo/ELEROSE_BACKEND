import { inject, injectable } from "tsyringe";
import { ROLS_CODE } from "../../../../shared/constant.ts";
import { DATABASE_TOKENS } from "../../../../shared/database/database.container.tokens.ts";
import type { IUnitOfWork } from "../../../../shared/database/unit.of.work.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { ROL_RESPONSE_CODE } from "../../../../shared/reseponse/rol.response.code.ts";
import { ROL_PERMISSION_TOKENS } from "../container/rol.permission.tokens.ts";
import { ROL_TOKENS } from "../container/rol.tokens.ts";
import type { RolPermissionRepository } from "../domain/repositories/rol.permission.repository.ts";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import type { TDataUpdateRol } from "../types/rol.type.ts";

@injectable()
export class UpdateRolUseCase {

    constructor(
        @inject(DATABASE_TOKENS.UNIT_OF_WORK)
        private readonly unitOfWork: IUnitOfWork
    ) { }

    async execute(id: number, values: TDataUpdateRol, idUser: number) {

        return this.unitOfWork.execute(async (contex) => {

            const rolRepository: RolRepository = contex.resolve(ROL_TOKENS.REPOSITORY);

            const rolPermissionRepository: RolPermissionRepository = contex.resolve(ROL_PERMISSION_TOKENS.REPOSITORY);

            const rol = values.rol;

            const permissions = values.permissions;

            // validate id rol
            if (!id) {

                throw new AppException(
                    400, ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID, "Identificador incorrecto",
                );

            }

            const rolFound = await rolRepository.findById(id);

            // validate exist rol
            if (!rolFound) {

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

            const existNameInOtherRecord = await rolRepository.existByNameExludeById( 
                values.rol.rol_Nombre,
                id 
            );

            if( existNameInOtherRecord ){

                throw new AppException(
                    400,
                    ROL_RESPONSE_CODE.ROL_EXIST,
                    `Rol de nombre ${values.rol.rol_Nombre} ya existente`
                );

            }

            // update rol
            const rolUpdated = await rolRepository.update(id, {
                ...rol,
                rol_ModificacionId: idUser
            });

            // update permissions
            const currentPermissions = await rolPermissionRepository.update(
                id,
                permissions.map((item) => (
                        { ...item, perol_ModificacionId: idUser }
                    )
                ),
                idUser
            );

            return {
                rol: rolUpdated,
                permissions: currentPermissions
            }

        });

    }

}