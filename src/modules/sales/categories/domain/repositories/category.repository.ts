import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import type { TCreateCategory, TUpdateCategory } from "../../types/category.type.ts";
import type { CategoryEntity } from "../entities/category.entity.ts";

export abstract class CategoryRepository {

    abstract create( values: TCreateCategory ): Promise<CategoryEntity>;

    abstract update( id: number, values: TUpdateCategory ): Promise<CategoryEntity | null>;

    abstract findById( id: number ): Promise<CategoryEntity | null>;

    abstract findByNameExludeId( value: string , id: number ): Promise<CategoryEntity | null>;

    abstract findByName( value: string ): Promise<CategoryEntity | null>;

    abstract search( name: string ): Promise<CategoryEntity[]>;

    abstract disable( id: number , idCurrentUser: number): Promise<CategoryEntity | null>;

    abstract enable( id: number, idCurrentUser: number ): Promise<CategoryEntity | null>;

    abstract findOnlyActives( ): Promise<CategoryEntity[]>;

    abstract paginate( page: number , limit: number ): Promise<TPagination<CategoryEntity>>;

}