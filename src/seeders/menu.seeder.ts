import { inject, injectable } from "tsyringe";
import type { Repository } from "typeorm";
import type { ModuleEntityDB } from "../modules/menu/infraestructure/database/module.entity.db.ts";
import { MENU_TOKENS, OPTION_TOKENS, SUBMODULE_TOKENS } from "../modules/menu/container/menu.container.tokens.ts";
import type { OptionEntityDB } from "../modules/menu/infraestructure/database/option.entity.db.ts";
import type { TMenu, TModule, TSubmoduleMenu } from "../modules/menu/types/menu.type.ts";
import type { SubmoduleEntityDB } from "../modules/menu/infraestructure/database/submodule.entity.db.ts";

@injectable()
export class MenuSeeder {

    constructor(

        @inject(MENU_TOKENS.REPOSITORY_DB)
        private readonly moduleRepositoryDB: Repository<ModuleEntityDB>,

        @inject(OPTION_TOKENS.REPOSITORY_DB)
        private readonly optionRepositoryDB: Repository<OptionEntityDB>,

        @inject(SUBMODULE_TOKENS.REPOSITORY_DB)
        private readonly submoduleRepositoryDB: Repository<SubmoduleEntityDB>

    ) { }

    async execute() {
        try {

            const menu: TMenu[] = [
                {
                    module: {
                        modulo_Nombre: "Ventas",
                        modulo_Icono: "bi-cart3",
                        modulo_Activo: true,
                        modulo_Codigo: "VENTAS",
                        modulo_Orden: 2,

                    },
                    submodules: [
                        {
                            submodule: {
                                submo_Nombre: "GESTIÓN",
                                submo_Codigo: "VENTAS_GESTION",
                                submo_Activo: true,
                                submo_Orden: 1
                            },
                            options: [
                                { opcion_Nombre: "Categorías", opcion_Codigo: "VENTAS_CATEGORIAS", opcion_Activo: true, opcion_Ruta: "/sales/categories", opcion_Orden: 1 },
                                { opcion_Nombre: "Productos", opcion_Codigo: "VENTAS_PRODUCTOS", opcion_Activo: true, opcion_Ruta: "/sales/products", opcion_Orden: 2 },
                                { opcion_Nombre: "Clientes", opcion_Codigo: "VENTAS_CLIENTES", opcion_Activo: true, opcion_Ruta: "/sales/clients", opcion_Orden: 3},
                            ]
                        }
                    ]
                },
                {
                    module: {
                        modulo_Nombre: "Inventarios",
                        modulo_Icono: "bi bi-boxes",
                        modulo_Activo: true,
                        modulo_Codigo: "INVENTARIOS",
                        modulo_Orden: 2,

                    },
                    submodules: [
                        {
                            submodule: {
                                submo_Nombre: "GESTIÓN",
                                submo_Codigo: "INVENTARIOS_GESTION",
                                submo_Activo: true,
                                submo_Orden: 1
                            },
                            options: [
                                { opcion_Nombre: "Almacenes", opcion_Codigo: "INVENTARIOS_ALMACENES", opcion_Activo: true, opcion_Ruta: "/inventories/warehouses", opcion_Orden: 1 },
                            ]
                        }
                    ]
                },
                {
                    module: {
                        modulo_Nombre: "Configuración",
                        modulo_Icono: "bi-gear",
                        modulo_Activo: true,
                        modulo_Codigo: "CONFIGURACION",
                        modulo_Orden: 3,

                    },
                    submodules: [
                        {
                            submodule: {
                                submo_Nombre: "OPCIONES DE CONFIGURACIÓN",
                                submo_Codigo: "CONFIGURACION_OPCIONES",
                                submo_Activo: true,
                                submo_Orden: 1
                            },
                            options: [
                                { opcion_Nombre: "Usuarios", opcion_Codigo: "CONFIGURACION_USUARIOS", opcion_Activo: true, opcion_Ruta: "/settings/users", opcion_Orden: 1 },
                                { opcion_Nombre: "Roles", opcion_Codigo: "CONFIGURACION_ROLES", opcion_Activo: true, opcion_Ruta: "/settings/rols", opcion_Orden: 2 },
                            ]
                        }
                    ]
                }
            ];

            menu.map(async (m) => {

                const { module, submodules } = m;

                //save module

                const exist = await this.moduleRepositoryDB.findOneBy({ modulo_Codigo: module.modulo_Codigo });
                let currentModule: TModule | null = null;

                if (!exist) {

                    const moduleNew = this.moduleRepositoryDB.create({ ...module });
                    currentModule = await this.moduleRepositoryDB.save(moduleNew);

                } else {

                    currentModule = exist;

                }

                // save submodules
                submodules.map(async ({ submodule, options }) => {

                    const exist = await this.submoduleRepositoryDB.findOneBy({ submo_Codigo: submodule.submo_Codigo });
                    let currentSubmodule: TSubmoduleMenu | null = null;

                    if (!exist) {

                        const optionNew = this.submoduleRepositoryDB.create({
                            ...submodule,
                            submo_ModuloId: currentModule.modulo_Id
                        });

                        currentSubmodule = await this.submoduleRepositoryDB.save(optionNew);

                    } else {

                        currentSubmodule = exist;

                    }

                    options.map(async (option) => {

                        const exist = await this.optionRepositoryDB.findOneBy({ opcion_Codigo: option.opcion_Codigo });

                        if (!exist) {

                            const optionNew = this.optionRepositoryDB.create({
                                ...option,
                                opcion_SubmoduloId: currentSubmodule.submo_Id
                            });

                            await this.optionRepositoryDB.save(optionNew);

                        }

                    });

                });

            });

            console.log("Seeder menu execute successfully");

        } catch (error) {

            console.error("Error during execute seeder menu:", error);

        }
    }
}