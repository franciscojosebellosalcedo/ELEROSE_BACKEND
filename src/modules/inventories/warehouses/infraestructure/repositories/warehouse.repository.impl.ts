import { inject, injectable } from "tsyringe";
import type { WarehouseRepository } from "../../domain/repositories/warehouse.repository.ts";
import { WAREHOUSE_TOKENS } from "../../container/warehouse.container.tokens.ts";
import type { WarehouseEntity } from "../../domain/entities/warehouse.entity.ts";
import type { TCreateWarehouse, TUpdateWarehouse } from "../../types/warehouse.type.ts";
import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import { ILike, In, Not, type Repository } from "typeorm";
import type { WarehouseEntityDB } from "../database/warehouse.entity.db.ts";

@injectable()
export class WarehouseRepositoryImpl implements WarehouseRepository {

    constructor(

        @inject( WAREHOUSE_TOKENS.REPOSITORY_DB )
        private readonly warehouseRepositoryDB: Repository<WarehouseEntityDB>

    ){}

    async create(values: TCreateWarehouse): Promise<WarehouseEntity> {
        
        const warehouseNew = this.warehouseRepositoryDB.create(values);
        return await this.warehouseRepositoryDB.save( warehouseNew );

    }

    async disable(id: number, idCurrentUser: number ): Promise<WarehouseEntity | null> {
        
        await this.warehouseRepositoryDB.update({ alm_Id: id },{
            alm_Activo: false,
            alm_ModificacionId: idCurrentUser
        });

        return await this.warehouseRepositoryDB.findOneBy({ alm_Id: id });

    }

    async findByName(name: string): Promise<WarehouseEntity | null> {

        return await this.warehouseRepositoryDB.findOneBy({
            alm_Nombre: name
        });
        
    }

    async enable(id: number, idCurrentUser: number): Promise<WarehouseEntity | null> {

        await this.warehouseRepositoryDB.update({ alm_Id: id },{
            alm_Activo: true,
            alm_ModificacionId: idCurrentUser
        });

        return await this.warehouseRepositoryDB.findOneBy({ alm_Id: id });
        
    }

    async findById(id: number): Promise<WarehouseEntity | null> {
        return await this.warehouseRepositoryDB.findOneBy({ alm_Id: id });
    }

    async findByNameExludeId(name: string, id: number): Promise<WarehouseEntity | null> {

        return await this.warehouseRepositoryDB.findOneBy({
            alm_Nombre: name,
            alm_Id: Not( In([ id ]) )
        });

    }

    async paginate(page: number, limit: number): Promise<TPagination<WarehouseEntity>> {
        
        const [ records , total ] = await this.warehouseRepositoryDB.findAndCount({
            take: limit,
            skip: ( page - 1 ) * limit,
            order: {
                alm_Creacion: "DESC"
            }
        });

        const totalPages = Math.ceil( total / limit );

        return {
            limit,
            page,
            records,
            total,
            totalPages,
            totalRecords: records.length
        };

    }

    async search(value: string): Promise<WarehouseEntity[]> {
        
        return await this.warehouseRepositoryDB.findBy({
            alm_Nombre: ILike(`%${value}%`)
        });

    }

    async update( id: number, values: TUpdateWarehouse): Promise<WarehouseEntity | null> {
        
        await this.warehouseRepositoryDB.update({ alm_Id: id },{
            ...values
        });

        return await this.warehouseRepositoryDB.findOneBy({ alm_Id: id });

    }

}