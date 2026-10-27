import { inject, injectable } from "tsyringe";
import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import type { CategoryEntity } from "../../domain/entities/category.entity.ts";
import type { CategoryRepository } from "../../domain/repositories/category.repository.ts";
import type { TCreateCategory, TUpdateCategory } from "../../types/category.type.ts";
import { CATEGORY_TOKENS } from "../../container/category.tokens.ts";
import { ILike, In, Not, type Repository } from "typeorm";
import type { CategoryEntityDB } from "../database/category.entity.db.ts";

@injectable()
export class CategoryRepositoryImpl implements CategoryRepository {

    constructor(
        @inject( CATEGORY_TOKENS.REPOSITORY_DB )
        private readonly categoryRepositoryDB: Repository<CategoryEntityDB>
    ){}

    async search(name: string): Promise<CategoryEntity[]> {
        return await this.categoryRepositoryDB.findBy({
            cate_Nombre: ILike(`%${name}%`)
        });
    }

    async disable(id: number, idCurrentUser: number ): Promise<CategoryEntity | null> {
        
        await this.categoryRepositoryDB.update({ cate_Id: id},{
            cate_Activo: false,
            cate_ModificacionId: idCurrentUser
        });

        return this.categoryRepositoryDB.findOneBy({ cate_Id: id });

    }

    async enable(id: number, idCurrentUser: number ): Promise<CategoryEntity | null> {

        await this.categoryRepositoryDB.update({ cate_Id: id},{
            cate_Activo: true,
            cate_ModificacionId: idCurrentUser
        });

        return this.categoryRepositoryDB.findOneBy({ cate_Id: id });

    }

    async create(values: TCreateCategory): Promise<CategoryEntity> {
        
        const categoryNew = this.categoryRepositoryDB.create({
            cate_Nombre: values.cate_Nombre,
            cate_Codigo: values.cate_Codigo,
            cate_CreacionId: values.cate_CreacionId
        });

        return await this.categoryRepositoryDB.save( categoryNew );

    }

    async findById(id: number): Promise<CategoryEntity | null> {
        return await this.categoryRepositoryDB.findOneBy({ cate_Id: id });
    }
    
    async findByName(value: string): Promise<CategoryEntity | null> {
        return await this.categoryRepositoryDB.findOneBy({ cate_Nombre: value });
    }
    
    async findByNameExludeId(value: string, id: number): Promise<CategoryEntity | null> {
        return await this.categoryRepositoryDB.findOneBy({ 
            cate_Nombre: value,
            cate_Id: Not( In( [ id ] ))
        });
    }

    async findOnlyActives(): Promise<CategoryEntity[]> {
        return await this.categoryRepositoryDB.findBy({
            cate_Activo: true
        });
    }

    async paginate( page: number, limit: number ): Promise<TPagination<CategoryEntity>> {
        
        const [ records , total ] = await this.categoryRepositoryDB.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: {
                cate_Creacion: "DESC"
            }
        });

        const totalPages = Math.ceil(total / limit );

        return {

            limit: limit,
            page: page,
            records: records,
            total: total,
            totalPages: totalPages,
            totalRecords: records.length

        }
    }

    async update(id: number, values: TUpdateCategory): Promise<CategoryEntity | null> {
        
        await this.categoryRepositoryDB.update({ cate_Id: id},{
            cate_Nombre: values.cate_Nombre,
            cate_Codigo: values.cate_Codigo,
            cate_ModificacionId: values.cate_ModificacionId
        });

        return await this.categoryRepositoryDB.findOneBy({ cate_Id: id });

    }

}