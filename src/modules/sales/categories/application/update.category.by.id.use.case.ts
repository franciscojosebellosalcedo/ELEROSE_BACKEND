import { inject, injectable } from "tsyringe";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";
import type { TUpdateCategory } from "../types/category.type.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { CATEGORY_RESPONSE_CODE } from "../../../../shared/reseponse/category.response.code.ts";

@injectable()
export class UpdateCategoryUseCase {

    constructor(
        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository
    ){}

    async execute( id: number , values: TUpdateCategory ){

        const exist = await this.categoryRepository.findByNameExludeId( values.cate_Nombre , id );

        if(exist){
            
            throw new AppException(
                400,
                CATEGORY_RESPONSE_CODE.CATEGORY_READY_EXIST,
                `Categoría ${values.cate_Nombre} ya existente`
            );

        }

        const result = await this.categoryRepository.update( id , values );

        return result;
        
    }

}