import { container } from "tsyringe";
import { AppDataSource } from "../../../../config/database/database.config.ts";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import { CategoryRepositoryImpl } from "../infraestructure/repositories/category.repository.impl.ts";
import { CATEGORY_TOKENS } from "./category.tokens.ts";
import { CategoryEntityDB } from "../infraestructure/database/category.entity.db.ts";
import { CreateCategoryUseCase } from "../application/create.category.use.case.ts";
import { CategoryController } from "../presentation/controller/category.controller.ts";
import { UpdateCategoryUseCase } from "../application/update.category.by.id.use.case.ts";
import { GetCategoryByIdUseCase } from "../application/get.category.by.id.use.case.ts";
import { PaginateCategoriesUseCase } from "../application/paginate.category.use.case.ts";
import { SearchCategoryByNameUseCase } from "../application/search.category.use.case.ts";
import { DisableCategoryUseCase } from "../application/disable.category.by.id.ts";
import { EnableCategoryUseCase } from "../application/enable.category.by.id.use.case.ts";

container.register(
    CATEGORY_TOKENS.REPOSITORY_DB,
    {
        useFactory: ()=>{
            return AppDataSource.getRepository( CategoryEntityDB );
        }
    }
);

container.register(
    CATEGORY_TOKENS.SEARCH,
    {
        useClass: SearchCategoryByNameUseCase
    }
);

container.register(
    CATEGORY_TOKENS.ENABLE,
    {
        useClass: EnableCategoryUseCase
    }
);

container.register(
    CATEGORY_TOKENS.DISABLE,
    {
        useClass: DisableCategoryUseCase
    }
);

container.register(
    CATEGORY_TOKENS.PAGINATE,
    {
        useClass: PaginateCategoriesUseCase
    }
);

container.register(
    CATEGORY_TOKENS.GET_BY_ID,
    {
        useClass: GetCategoryByIdUseCase
    }
);

container.register(
    CATEGORY_TOKENS.UPDATE,
    {
        useClass: UpdateCategoryUseCase
    }
);

container.register(
    CATEGORY_TOKENS.CREATE,
    {
        useClass: CreateCategoryUseCase
    }
);

container.register(
    CATEGORY_TOKENS.CONTROLLER,
    {
        useClass: CategoryController
    }
);

container.register<CategoryRepository>(
    CATEGORY_TOKENS.REPOSITORY,
    {
        useClass: CategoryRepositoryImpl
    }
);