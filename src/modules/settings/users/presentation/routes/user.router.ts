import { Router } from "express";
import { container } from "tsyringe";
import { USER_TOKENS } from "../../container/user.container.tokens.ts";
import type { UserController } from "../controller/user.controller.ts";
import { handlerAsync } from "../../../../../shared/errors/handler.async.ts";
import { permissionGuard } from "../../../../../middleware/permission.middleware.ts";
import { OPTIONS } from "../../../../../shared/menu/menu.code.ts";

const controller = container.resolve<UserController>( USER_TOKENS.CONTROLLER );

const router = Router();

router.post("/", permissionGuard([OPTIONS.CONFIGURACION_USUARIOS], "add"), handlerAsync( controller.create ) );

router.put("/:id", permissionGuard([OPTIONS.CONFIGURACION_USUARIOS], "update"), handlerAsync( controller.update ) );

router.put("/:id/disable", permissionGuard([OPTIONS.CONFIGURACION_USUARIOS], "changeStatus"), handlerAsync( controller.disable ) );

router.put("/:id/enable", permissionGuard([OPTIONS.CONFIGURACION_USUARIOS], "changeStatus"), handlerAsync( controller.enable ) );

router.get("/paginate", handlerAsync( controller.paginate ) );

router.get("/search", handlerAsync( controller.search ) );

router.get("/:id", handlerAsync( controller.getUserById ) );

router.get("/:id/only-user", handlerAsync( controller.getOnlyUserById ) );

export default router;