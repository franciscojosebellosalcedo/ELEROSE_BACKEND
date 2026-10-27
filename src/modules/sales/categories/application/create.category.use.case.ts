import { inject, injectable } from "tsyringe";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { CATEGORY_RESPONSE_CODE } from "../../../../shared/reseponse/category.response.code.ts";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import type { TCreateCategory } from "../types/category.type.ts";

@injectable()
export class CreateCategoryUseCase {

    constructor(
        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute( values: TCreateCategory ){

        const exist = await this.categoryRepository.findByName( values.cate_Nombre );

        if(exist){

            throw new AppException(
                400,
                CATEGORY_RESPONSE_CODE.CATEGORY_READY_EXIST,
                `Categoría ${values.cate_Nombre} ya existente`
            );

        }

        const result = await this.categoryRepository.create(values);

        return result;

    }
}