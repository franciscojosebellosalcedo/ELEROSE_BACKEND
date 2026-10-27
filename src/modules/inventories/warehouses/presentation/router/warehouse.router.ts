import { Router } from "express";
import { container } from "tsyringe";
import { WAREHOUSE_TOKENS } from "../../container/warehouse.container.tokens.ts";
import { authMiddleware } from "../../../../../middleware/auth.middleware.ts";
import { permissionGuard } from "../../../../../middleware/permission.middleware.ts";
import { OPTIONS } from "../../../../../shared/menu/menu.code.ts";
import { handlerAsync } from "../../../../../shared/errors/handler.async.ts";
import type { WarehouseController } from "../controller/warehouse.controller.ts";

const controller = container.resolve<WarehouseController>( WAREHOUSE_TOKENS.CONTROLLER );

const router = Router();

router.post("/", authMiddleware, permissionGuard([ OPTIONS.INVENTARIOS_ALMACENES], "add"), handlerAsync( controller.create ) );

router.get("/paginate", authMiddleware, handlerAsync( controller.paginate ) );

router.put("/:id", authMiddleware, permissionGuard([ OPTIONS.INVENTARIOS_ALMACENES], "update"), handlerAsync( controller.update ) );

router.put("/disable/:id", authMiddleware, permissionGuard([ OPTIONS.INVENTARIOS_ALMACENES], "changeStatus"), handlerAsync( controller.disable ) );

router.put("/enable/:id", authMiddleware, permissionGuard([ OPTIONS.INVENTARIOS_ALMACENES], "changeStatus"), handlerAsync( controller.enable ) );

router.get("/:id", authMiddleware, handlerAsync( controller.getById ) );

router.get("/search/:name", authMiddleware, handlerAsync( controller.search ) );

export default router;
