import { inject, injectable } from "tsyringe";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { CATEGORY_RESPONSE_CODE } from "../../../../shared/reseponse/category.response.code.ts";

@injectable()
export class GetCategoryByIdUseCase {

    constructor(
        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute( id: number ){

        if(!id){

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador incorrecto"
            );

        }

        const found = await this.categoryRepository.findById( id );
        if(!found){

            throw new AppException(
                404,
                CATEGORY_RESPONSE_CODE.CATEGORY_NOT_FOUND,
                "Categoría no encontrada"
            );

        }

        const result = await this.categoryRepository.findById( id );

        return result;
        
    }

}