import { inject, injectable } from "tsyringe";
import { CATEGORY_TOKENS } from "../container/category.tokens.ts";
import type { CategoryRepository } from "../domain/repositories/category.repository.ts";

@injectable()
export class PaginateCategoriesUseCase {

    constructor(

        @inject( CATEGORY_TOKENS.REPOSITORY )
        private readonly categoryRepository: CategoryRepository

    ){}

    async execute( page: number , limit: number ){

        const result = await this.categoryRepository.paginate( page, limit );
        return  result;

    }

}