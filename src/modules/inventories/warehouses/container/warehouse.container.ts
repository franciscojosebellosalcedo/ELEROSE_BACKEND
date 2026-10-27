import { container } from "tsyringe";
import { WAREHOUSE_TOKENS } from "./warehouse.container.tokens.ts";
import { AppDataSource } from "../../../../config/database/database.config.ts";
import { WarehouseEntityDB } from "../infraestructure/database/warehouse.entity.db.ts";
import { WarehouseRepositoryImpl } from "../infraestructure/repositories/warehouse.repository.impl.ts";
import { CreateWarehouseUseCase } from "../application/create.warehouse.use.case.ts";
import { WarehouseController } from "../presentation/controller/warehouse.controller.ts";
import { UpdateWarehouseUseCase } from "../application/update.warehouse.use.case.ts";
import { GetWarehouseByIdUseCase } from "../application/get.warehouse.by.id.use.case.ts";
import { SearchWarehouseUseCase } from "../application/search.warehouse.use.case.ts";
import { DisableWarehouseByIdUseCase } from "../application/disable.warehouse.by.id.use.case.ts";
import { EnableWarehouseByIdUseCase } from "../application/enable.warehouse.by.id.use.case.ts";
import { PaginateWarehouseUseCase } from "../application/paginate.warehouse.use.case.ts";

container.register(
    WAREHOUSE_TOKENS.REPOSITORY_DB,
    {
        useFactory: () =>{
            return AppDataSource.getRepository( WarehouseEntityDB );
        }
    }
);

container.register(
    WAREHOUSE_TOKENS.REPOSITORY,
    {
        useClass: WarehouseRepositoryImpl
    }
);

container.register(
    WAREHOUSE_TOKENS.GET_BY_ID,
    {
        useClass: GetWarehouseByIdUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.DISABLE,
    {
        useClass: DisableWarehouseByIdUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.PAGINATE,
    {
        useClass: PaginateWarehouseUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.ENABLE,
    {
        useClass: EnableWarehouseByIdUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.SEARCH,
    {
        useClass: SearchWarehouseUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.CONTROLLER,
    {
        useClass: WarehouseController
    }
);

container.register(
    WAREHOUSE_TOKENS.UPDATE,
    {
        useClass: UpdateWarehouseUseCase
    }
);

container.register(
    WAREHOUSE_TOKENS.CREATE,
    {
        useClass: CreateWarehouseUseCase
    }
);