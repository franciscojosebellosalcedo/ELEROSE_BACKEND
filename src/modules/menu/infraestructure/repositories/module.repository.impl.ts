import { inject, injectable } from "tsyringe";
import type { ModuleRepository } from "../../domain/repositories/module.repository.ts";
import type { TMenu } from "../../types/menu.type.ts";
import type { Repository } from "typeorm";
import type { ModuleEntityDB } from "../database/module.entity.db.ts";
import type { SubmoduleEntityDB } from "../database/submodule.entity.db.ts";
import type { OptionEntityDB } from "../database/option.entity.db.ts";
import {
    MENU_TOKENS,
    OPTION_TOKENS,
    SUBMODULE_TOKENS
} from "../../container/menu.container.tokens.ts";

@injectable()
export class ModuleRepositoryImpl implements ModuleRepository {

    constructor(
        @inject(MENU_TOKENS.REPOSITORY_DB)
        private readonly moduleRepositoryDB: Repository<ModuleEntityDB>,

        @inject(SUBMODULE_TOKENS.REPOSITORY_DB)
        private readonly submoduleRepositoryDB: Repository<SubmoduleEntityDB>,

        @inject(OPTION_TOKENS.REPOSITORY_DB)
        private readonly optionRepositoryDB: Repository<OptionEntityDB>
    ) { }

    getMenu = async (): Promise<TMenu[]> => {

        const modules = await this.moduleRepositoryDB.findBy({
            modulo_Activo: true
        });

        return Promise.all(
            modules.map(async (module): Promise<TMenu> => {

                const submodules = await this.submoduleRepositoryDB.find({
                    where: {
                        submo_ModuloId: module.modulo_Id,
                        submo_Activo: true
                    },
                    order: {
                        submo_Orden: "ASC"
                    }
                });

                const submodulesWithOptions = await Promise.all(
                    submodules.map(async (submodule) => {

                        const options = await this.optionRepositoryDB.findBy({
                            opcion_SubmoduloId: submodule.submo_Id,
                            opcion_Activo: true
                        });

                        return {
                            submodule,
                            options
                        };
                    })
                );

                return {
                    module,
                    submodules: submodulesWithOptions
                };
            })
        );
    };

}