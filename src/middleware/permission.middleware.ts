import type { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { In, type Repository } from "typeorm";
import { OPTION_TOKENS } from "../modules/menu/container/menu.container.tokens.ts";
import type { OptionEntityDB } from "../modules/menu/infraestructure/database/option.entity.db.ts";
import { ROL_TOKENS } from "../modules/settings/rols/container/rol.tokens.ts";
import type { RolEntityDB } from "../modules/settings/rols/infraestructure/database/rol.entity.db.ts";
import { USER_PERMISSION_TOKENS } from "../modules/settings/users/container/user.permission.tokens.ts";
import type { UserPermissionEntityDB } from "../modules/settings/users/infraestructure/database/user.permission.entity.db.ts";
import { getCurrentUser } from "../shared/context/handler.current.user.ts";
import type { OPTIONS } from "../shared/menu/menu.code.ts";
import { ROLS_CODE } from "../shared/constant.ts";
import { AppException } from "../shared/errors/handler.error.ts";
import { ERROR_RESPONSE_CODE } from "../shared/errors/error.response.code.ts";

export const permissionGuard = (option: string[], action: "access" | "add" | "update" | "changeStatus") => {

    return async (req: Request, res: Response, next: NextFunction) => {

        const user = getCurrentUser(req);

        const optionRepositoryDB: Repository<OptionEntityDB> = container.resolve(OPTION_TOKENS.REPOSITORY_DB);
        const rolRepositoryDB: Repository<RolEntityDB> = container.resolve(ROL_TOKENS.REPOSITORY_DB);
        const permissionRepositoryDB: Repository<UserPermissionEntityDB> = container.resolve(USER_PERMISSION_TOKENS.REPOSITORY_DB);

        const rol = await rolRepositoryDB.findOneBy({
            rol_Id: user.usua_RolId
        });

        if (rol?.rol_Codigo === ROLS_CODE.ADMIN) {

            return next();

        }

        const optionFound = await optionRepositoryDB.findOneBy({
            opcion_Codigo: In( option )
        });

        const permissions = await permissionRepositoryDB.findBy({
            peusua_UsuarioId: user.usua_Id
        });

        const permission = permissions.find((p) => p.peusua_OpcionId === optionFound?.opcion_Id);

        if (!permission) {

            throw new AppException(
                403,
                ERROR_RESPONSE_CODE.ERROR_NOT_PERMISSION,
                "No tienes permisos para esta acción"
            );

        }

        if (
            action === "access" && !permission
        ) {

            throw new AppException(
                403,
                ERROR_RESPONSE_CODE.ERROR_NOT_PERMISSION,
                "No tienes permisos para esta acción"
            );

        }

        if (
            action === "add" && !permission.peusua_Crear
        ) {

            throw new AppException(
                403,
                ERROR_RESPONSE_CODE.ERROR_NOT_PERMISSION,
                "No tienes permisos para esta acción"
            );

        }

        if (
            action === "update" && !permission.peusua_Editar
        ) {

            throw new AppException(
                403,
                ERROR_RESPONSE_CODE.ERROR_NOT_PERMISSION,
                "No tienes permisos para esta acción"
            );

        }

        if (
            action === "changeStatus" && !permission.peusua_CambiarStatus
        ) {

            throw new AppException(
                403,
                ERROR_RESPONSE_CODE.ERROR_NOT_PERMISSION,
                "No tienes permisos para esta acción"
            );

        }

    }
}