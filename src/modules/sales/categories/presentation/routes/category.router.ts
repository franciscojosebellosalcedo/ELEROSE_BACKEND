import { Router } from "express";
import { authMiddleware } from "../../../../../middleware/auth.middleware.ts";
import { handlerAsync } from "../../../../../shared/errors/handler.async.ts";
import { container } from "tsyringe";
import type { CategoryController } from "../controller/category.controller.ts";
import { CATEGORY_TOKENS } from "../../container/category.tokens.ts";
import { permissionGuard } from "../../../../../middleware/permission.middleware.ts";
import { OPTIONS } from "../../../../../shared/menu/menu.code.ts";

const controller = container.resolve<CategoryController>( CATEGORY_TOKENS.CONTROLLER );

const router = Router();

router.post("/", authMiddleware, permissionGuard([OPTIONS.VENTAS_CATEGORIAS], "add"), handlerAsync( controller.create ) );

router.get("/paginate", authMiddleware, handlerAsync( controller.paginate ) );

router.get("/search/:name", authMiddleware, handlerAsync( controller.search ) );

router.get("/:id", authMiddleware, handlerAsync( controller.getById ) );

router.put("/:id", authMiddleware, permissionGuard([OPTIONS.VENTAS_CATEGORIAS], "update"), handlerAsync( controller.update ) );

router.put("/:id/enable", authMiddleware, permissionGuard([OPTIONS.VENTAS_CATEGORIAS], "changeStatus"), handlerAsync( controller.enable ) );

router.put("/:id/disable", authMiddleware, permissionGuard([OPTIONS.VENTAS_CATEGORIAS], "changeStatus"), handlerAsync( controller.disable ) );

export default router;