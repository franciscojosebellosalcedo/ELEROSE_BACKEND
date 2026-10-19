import { container } from "tsyringe";
import type { Repository } from "typeorm";
import { AppDataSource } from "../../../../config/database/database.config.ts";
import { UserSeeder } from "../../../../seeders/user.seeder.ts";
import { CreateUserUseCase } from "../application/create.user.use-case.ts";
import { PaginateUserUseCase } from "../application/paginate.user.use.case.ts";
import type { UserPermissionRepository } from "../domain/repositories/user.permission.repository.ts";
import type { UserRepository } from "../domain/repositories/user.repository.ts";
import { UserEntityDB } from "../infraestructure/database/user.entity.db.ts";
import { UserPermissionEntityDB } from "../infraestructure/database/user.permission.entity.db.ts";
import { UserPermissionRepositoryImpl } from "../infraestructure/repositories/user.permission.repository.impl.ts";
import { UserRepositoryImpl } from "../infraestructure/repositories/user.repository.impl.ts";
import { UserController } from "../presentation/controller/user.controller.ts";
import { USER_TOKENS } from "./user.container.tokens.ts";
import { USER_PERMISSION_TOKENS } from "./user.permission.tokens.ts";
import { SearchUserUseCase } from "../application/search.user.use.case.ts";
import { DisableUserUseCase } from "../application/disable.user.use.case.ts";
import { EnableUserUseCase } from "../application/enable.user.use.case.ts";
import { GetUserByIdUseCase } from "../application/get.user.by.id.use.case.ts";
import { GetOnlyUserByIdUseCase } from "../application/get.only.user.by.id.use.case.ts";
import { UpdateUserByIdUseCase } from "../application/update.user.by.id.use.case.ts";

container.register<UpdateUserByIdUseCase>(
    USER_TOKENS.UPDATE_USER_BY_ID,
    {
        useClass: UpdateUserByIdUseCase
    }
)

container.register<GetOnlyUserByIdUseCase>(
    USER_TOKENS.GET_ONLLY_USER_BY_ID,
    {
        useClass: GetOnlyUserByIdUseCase
    }
)

container.register<GetUserByIdUseCase>(
    USER_TOKENS.GET_USER_BY_ID,
    {
        useClass: GetUserByIdUseCase
    }
)

container.register<EnableUserUseCase>(
    USER_TOKENS.ENABLE,
    {
        useClass: EnableUserUseCase
    }
);

container.register<DisableUserUseCase>(
    USER_TOKENS.DISABLE,
    {
        useClass: DisableUserUseCase
    }
);

container.register<SearchUserUseCase>(
    USER_TOKENS.SEARCH,
    {
        useClass: SearchUserUseCase
    }
);

container.register<Repository<UserPermissionEntityDB>>(
    USER_PERMISSION_TOKENS.REPOSITORY_DB,
    {
        useFactory: () =>{
            return AppDataSource.getRepository<UserPermissionEntityDB> ( UserPermissionEntityDB );
        }
    }
);

container.register<UserPermissionRepository>(
    USER_PERMISSION_TOKENS.REPOSITORY,
    {
        useClass: UserPermissionRepositoryImpl
    }
);

container.register<Repository<UserEntityDB>>(
    USER_TOKENS.REPOSITORY_DB,
    {
        useFactory : () => {
            return AppDataSource.getRepository(UserEntityDB)
        }
    }
);

container.register<PaginateUserUseCase>(
    USER_TOKENS.PAGINATE,
    {
        useClass: PaginateUserUseCase
    }
);

container.register<CreateUserUseCase>(
    USER_TOKENS.CREATE_USE_CASE,
    {
        useClass: CreateUserUseCase
    }
);

container.register<UserController>(
    USER_TOKENS.CONTROLLER,
    {
        useClass: UserController
    }
);

container.register<UserRepository>(
    USER_TOKENS.REPOSITORY,
    {
        useClass: UserRepositoryImpl
    }
);

container.register<UserSeeder>(
    USER_TOKENS.USER_SEEDER,
    {
        useClass: UserSeeder
    }
)