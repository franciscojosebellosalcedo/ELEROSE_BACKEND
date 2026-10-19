import { container } from "tsyringe";
import { Repository } from "typeorm";
import { ModuleEntityDB } from "../infraestructure/database/module.entity.db.ts";
import { MENU_TOKENS, OPTION_TOKENS, SUBMODULE_TOKENS } from "./menu.container.tokens.ts";
import { AppDataSource } from "../../../config/database/database.config.ts";
import { ModuleRepositoryImpl } from "../infraestructure/repositories/module.repository.impl.ts";
import type { ModuleRepository } from "../domain/repositories/module.repository.ts";
import { MenuSeeder } from "../../../seeders/menu.seeder.ts";
import type { OptionRepository } from "../domain/repositories/option.repository.ts";
import { OptionEntityDB } from "../infraestructure/database/option.entity.db.ts";
import { OptionRepositoryImpl } from "../infraestructure/repositories/option.repository.impl.ts";
import { MenuController } from "../presentation/controller/menu.controller.ts";
import { GetMenuUseCase } from "../application/get.menu.use.case.ts";
import type { SubmoduleRepository } from "../domain/repositories/submodule.repository.ts";
import { SubmoduleRepositoryImpl } from "../infraestructure/repositories/submodule.repository.impl.ts";
import { SubmoduleEntityDB } from "../infraestructure/database/submodule.entity.db.ts";

container.register<Repository<ModuleEntityDB>>(
    MENU_TOKENS.REPOSITORY_DB,
    {
        useFactory: () => {
            return AppDataSource.getRepository( ModuleEntityDB );
        }
    }
);

container.register<ModuleRepository>(
    MENU_TOKENS.REPOSITORY,
    {
        useClass: ModuleRepositoryImpl
    }
);

container.register<MenuSeeder>(
    MENU_TOKENS.SEEDER,
    {
        useClass: MenuSeeder
    }
);

container.register<Repository<OptionEntityDB>>(
    OPTION_TOKENS.REPOSITORY_DB,
    {
        useFactory: ()=>{
            return AppDataSource.getRepository( OptionEntityDB );
        }
    }
);

container.register<GetMenuUseCase>(
    MENU_TOKENS.GET_MENU_USE_CASE,
    {
        useClass: GetMenuUseCase
    }
)

container.register<MenuController>(
    MENU_TOKENS.CONTROLLER,
    {
        useClass: MenuController
    }
)

container.register<OptionRepository>(
    OPTION_TOKENS.REPOSITORY,
    {
        useClass: OptionRepositoryImpl
    }
);

container.register<SubmoduleRepository>(
    SUBMODULE_TOKENS.REPOSITORY,
    {
        useClass: SubmoduleRepositoryImpl
    }
);

container.register<Repository<SubmoduleEntityDB>>(
    SUBMODULE_TOKENS.REPOSITORY_DB,
    {
        useFactory: () =>{
            return AppDataSource.getRepository<SubmoduleEntityDB>( SubmoduleEntityDB );
        }
    }
);