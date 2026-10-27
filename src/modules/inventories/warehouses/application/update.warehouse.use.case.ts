import { inject, injectable } from "tsyringe";
import type { WarehouseRepository } from "../domain/repositories/warehouse.repository.ts";
import { WAREHOUSE_TOKENS } from "../container/warehouse.container.tokens.ts";
import type { TUpdateWarehouse } from "../types/warehouse.type.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { WAREHOUSE_RESPONSE_CODE } from "../../../../shared/reseponse/warehouse.response.code.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";

@injectable()
export class UpdateWarehouseUseCase {

    constructor(

        @inject( WAREHOUSE_TOKENS.REPOSITORY )
        private readonly warehouseRepository: WarehouseRepository

    ){}

    async execute( id: number, values: TUpdateWarehouse ) {

        if( !id ){

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador incorrecto"
            );

        }

        const warehouseFound = await this.warehouseRepository.findById( id );

        if(!warehouseFound){

            throw new AppException(
                404,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_NOT_FOUND,
                "Almacén no encontrado"
            );

        }

        const exist = await this.warehouseRepository.findByNameExludeId( values.alm_Nombre, id );

        if( exist ){

            throw new AppException(
                400,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_READY_EXIST,
                "Almacén ya existente"
            );

        };

        return await this.warehouseRepository.update( id, values );

    }

}