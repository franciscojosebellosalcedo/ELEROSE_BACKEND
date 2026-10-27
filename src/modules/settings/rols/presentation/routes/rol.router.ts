import { Router } from "express";
import { authMiddleware } from "../../../../../middleware/auth.middleware.ts";
import { handlerAsync } from "../../../../../shared/errors/handler.async.ts";
import { container } from "tsyringe";
import type { RolController } from "../controller/rol.controller.ts";
import { ROL_TOKENS } from "../../container/rol.tokens.ts";
import { permissionGuard } from "../../../../../middleware/permission.middleware.ts";
import { OPTIONS } from "../../../../../shared/menu/menu.code.ts";

const rolController = container.resolve<RolController>( ROL_TOKENS.CONTROLLER );

const router = Router();

router.post("/", authMiddleware, permissionGuard([OPTIONS.CONFIGURACION_ROLES], "add"), handlerAsync(rolController.create));

router.get("/search", authMiddleware, handlerAsync(rolController.search));

router.get("/actives", authMiddleware, handlerAsync(rolController.getOnlyActives));

router.get("/paginate", authMiddleware, handlerAsync(rolController.paginate));

router.get("/:id/only-rol", authMiddleware, handlerAsync(rolController.getOnlyRolById));

router.get("/:id", authMiddleware, handlerAsync(rolController.getRolById));

router.put("/:id", authMiddleware, permissionGuard([OPTIONS.CONFIGURACION_ROLES], "update"), handlerAsync(rolController.update));

router.put("/:id/disable", authMiddleware, authMiddleware, permissionGuard([OPTIONS.CONFIGURACION_ROLES], "changeStatus"), handlerAsync(rolController.disable));

router.put("/:id/enable", authMiddleware, permissionGuard([OPTIONS.CONFIGURACION_ROLES], "changeStatus"), handlerAsync(rolController.enable));

export default router;