import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import type { TCreateWarehouse, TUpdateWarehouse } from "../../types/warehouse.type.ts";
import type { WarehouseEntity } from "../entities/warehouse.entity.ts";

export abstract class WarehouseRepository {

    abstract create( values: TCreateWarehouse ): Promise<WarehouseEntity>;

    abstract update( id: number, values: TUpdateWarehouse ): Promise<WarehouseEntity | null>;

    abstract findById( id: number ) : Promise<WarehouseEntity | null>;

    abstract paginate( page: number, limit: number ) : Promise<TPagination<WarehouseEntity>>;

    abstract enable( id: number, idCurrentUser: number ): Promise<WarehouseEntity | null>;

    abstract findByName( name: string ): Promise<WarehouseEntity | null>;

    abstract disable( id: number , idCurrentUser: number): Promise<WarehouseEntity | null>;

    abstract search( value: string ): Promise<WarehouseEntity[]>;

    abstract findByNameExludeId ( name: string , id: number ): Promise<WarehouseEntity | null>;

}