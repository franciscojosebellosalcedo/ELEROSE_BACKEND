import { container } from "tsyringe";
import { TypeormUnitOfWork } from "./typeorm.unit.of.work.ts";
import { DATABASE_TOKENS } from "./database.container.tokens.ts";
import { AppDataSource } from "../../config/database/database.config.ts";

container.register<TypeormUnitOfWork>(
    DATABASE_TOKENS.UNIT_OF_WORK,
    {
        useClass: TypeormUnitOfWork
    }
)

container.registerInstance(
    DATABASE_TOKENS.ENTITY_MANAGER,
    AppDataSource.manager
);