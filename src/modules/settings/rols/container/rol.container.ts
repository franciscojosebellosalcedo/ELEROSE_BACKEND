import { container } from "tsyringe";
import type { Repository } from "typeorm";
import { AppDataSource } from "../../../../config/database/database.config.ts";
import { RolSeeder } from "../../../../seeders/rol.seeder.ts";
import { CreateRolUseCase } from "../application/create.rol.use.case.ts";
import { DisableRolUseCase } from "../application/disable.rol.use.case.ts";
import { EnableRolUseCase } from "../application/enable.rol.use.case.ts";
import { GetOnlyRolByIdUseCase } from "../application/get.only.rol.by.id.use.case.ts";
import { GetRolByIdUseCase } from "../application/get.rol.by.id.use.case.ts";
import { PaginateRolUseCase } from "../application/paginate.rol.use.case.ts";
import { SearchRolUseCase } from "../application/search.rol.use.case.ts";
import { UpdateRolUseCase } from "../application/update.rol.use.case.ts";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import { RolEntityDB } from "../infraestructure/database/rol.entity.db.ts";
import { RolRepositoryImpl } from "../infraestructure/repositories/rol.repository.impl.ts";
import { RolController } from "../presentation/controller/rol.controller.ts";
import { ROL_TOKENS } from "./rol.tokens.ts";
import { GetRolsActivesUseCase } from "../application/get.rols.actives.use.case.ts";

container.register(
    ROL_TOKENS.GET_ROLS_ACTIVES,
    {
        useClass: GetRolsActivesUseCase
    }
);

container.register<GetOnlyRolByIdUseCase>(
    ROL_TOKENS.GET_ONLY_ROL_BY_ID,
    {
        useClass: GetOnlyRolByIdUseCase
    }
);

container.register<RolRepository>(
    ROL_TOKENS.REPOSITORY,
    {
        useClass: RolRepositoryImpl
    }
);

container.register<RolSeeder>(
    ROL_TOKENS.SEEDER,
    {
        useClass: RolSeeder
    }
);

container.register<DisableRolUseCase>(
    ROL_TOKENS.DISABLE_ROL,
    {
        useClass: DisableRolUseCase
    }
);

container.register<SearchRolUseCase>(
    ROL_TOKENS.SEARCH,
    {
        useClass: SearchRolUseCase
    }
);

container.register<UpdateRolUseCase>(
    ROL_TOKENS.UPDATE_ROL,
    {
        useClass: UpdateRolUseCase
    }
);

container.register<EnableRolUseCase>(
    ROL_TOKENS.ENABLE_ROL,
    {
        useClass: EnableRolUseCase
    }
);

container.register<PaginateRolUseCase>(
    ROL_TOKENS.PAGINATE,
    {
        useClass: PaginateRolUseCase
    }
)

container.register<GetRolByIdUseCase>(
    ROL_TOKENS.GET_ROL_BY_ID,
    {
        useClass: GetRolByIdUseCase
    }
)

container.register<RolController>(
    ROL_TOKENS.CONTROLLER,
    {
        useClass: RolController
    }
);

container.register<CreateRolUseCase>(
    ROL_TOKENS.CREATE_ROL_USE_CASE,
    {
        useClass: CreateRolUseCase
    }
);

container.register<Repository<RolEntityDB>>(
    ROL_TOKENS.REPOSITORY_DB,
    {
        useFactory: () =>{
            return AppDataSource.getRepository( RolEntityDB )
        }
    }
);