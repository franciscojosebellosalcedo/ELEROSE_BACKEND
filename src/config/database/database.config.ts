
import { DataSource } from "typeorm";
import { envConfig } from "../env/env.config.ts";
import path from "node:path";
import { UserEntityDB } from "../../modules/settings/users/infraestructure/database/user.entity.db.ts";
import { ModuleEntityDB } from "../../modules/menu/infraestructure/database/module.entity.db.ts";
import { OptionEntityDB } from "../../modules/menu/infraestructure/database/option.entity.db.ts";
import { RolEntityDB } from "../../modules/settings/rols/infraestructure/database/rol.entity.db.ts";
import { RolPermissionEntityDB } from "../../modules/settings/rols/infraestructure/database/rol.permission.entity.db.ts";
import { SubmoduleEntityDB } from "../../modules/menu/infraestructure/database/submodule.entity.db.ts";
import { UserPermissionEntityDB } from "../../modules/settings/users/infraestructure/database/user.permission.entity.db.ts";

export const AppDataSource = new DataSource({

    type: "mysql",

    database: envConfig.dbName,

    port: envConfig.dbPort,

    host: envConfig.dbHost,

    username: envConfig.dbUser,

    password: envConfig.dbPassword,

    synchronize: false,

    entities: [
        UserEntityDB,
        ModuleEntityDB,
        OptionEntityDB,
        RolEntityDB,
        RolPermissionEntityDB,
        SubmoduleEntityDB,
        UserPermissionEntityDB
    ],

    migrations: process.env.RUNNING_TESTS === "true" ? [] : [
        path.resolve(
            process.cwd(),
            "migrations/*.{ts,js}"
        )
    ],

    logging: false,

});