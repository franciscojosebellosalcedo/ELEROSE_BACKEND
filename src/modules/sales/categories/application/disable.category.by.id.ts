import { inject, injectable } from "tsyringe";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { CATEGORY_RESPONSE_CODE } from "../../../../shared/reseponse/category.response.code.ts";

@injectable()
export class DisableCategoryUseCase {

    constructor(

        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository

    ){}

    async execute( id: number , idCurrentUser: number ){

        if(!id){

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Categoría no encontrada"
            );

        }

        const found = await this.categoryRepository.findById( id );

        if(!found){

            throw new AppException(
                404,
                CATEGORY_RESPONSE_CODE.CATEGORY_NOT_FOUND,
                "Categoría no encontrada"
            );

        };

        if(!found.cate_Activo){

            throw new AppException(
                400,
                CATEGORY_RESPONSE_CODE.CATEGORY_READY_DISABLE,
                "Categoría actualemente deshabilitada"
            );

        };

        const result = await this.categoryRepository.disable( id , idCurrentUser );

        return result;

    }

}