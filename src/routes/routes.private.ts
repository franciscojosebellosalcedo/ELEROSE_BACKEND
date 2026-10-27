import { Router } from "express";
import userRouter from "../modules/settings/users/presentation/routes/user.router.ts";
import menuRouter from "../modules/menu/presentation/routes/menu.router.ts";
import rolRouter from "../modules/settings/rols/presentation/routes/rol.router.ts";
import categoryRouter from "../modules/sales/categories/presentation/routes/category.router.ts";
import warehouseRouter from "../modules/inventories/warehouses/presentation/router/warehouse.router.ts";

const router = Router();

router.use("/users", userRouter );

router.use("/menu", menuRouter );

router.use("/rols", rolRouter );

router.use("/warehouses", warehouseRouter );

router.use("/categories", categoryRouter );

export default router;