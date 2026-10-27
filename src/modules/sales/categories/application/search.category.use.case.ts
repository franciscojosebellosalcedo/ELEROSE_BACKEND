import { inject, injectable } from "tsyringe";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";

@injectable()
export class SearchCategoryByNameUseCase {

    constructor(

        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository

    ){}

    async execute( value: string ){
        return await this.categoryRepository.search( value );
    }

}