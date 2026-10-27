import { Router } from "express";
import { container } from "tsyringe";
import type { MenuController } from "../controller/menu.controller.ts";
import { MENU_TOKENS } from "../../container/menu.container.tokens.ts";
import { handlerAsync } from "../../../../shared/errors/handler.async.ts";

const menuController = container.resolve<MenuController>( MENU_TOKENS.CONTROLLER );

const router = Router();

router.get("/", handlerAsync( menuController.getMenu ) );

router.get("/options", handlerAsync( menuController.getOptions ) );

export default router;