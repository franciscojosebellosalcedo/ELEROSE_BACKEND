import { inject, injectable } from "tsyringe";
import type { WarehouseRepository } from "../domain/repositories/warehouse.repository.ts";
import { WAREHOUSE_TOKENS } from "../container/warehouse.container.tokens.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";
import { WAREHOUSE_RESPONSE_CODE } from "../../../../shared/reseponse/warehouse.response.code.ts";


@injectable()
export class DisableWarehouseByIdUseCase {

    constructor(

        @inject( WAREHOUSE_TOKENS.REPOSITORY )
        private readonly warehouseRepository: WarehouseRepository

    ){};

    async execute ( id: number, idCurrentUser: number ){

        if(!id){

            throw new AppException(
                400,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador incorrecto"
            );

        };

        const found = await this.warehouseRepository.findById( id );

        if(!found){

            throw new AppException(
                404,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_NOT_FOUND,
                "Almacén no encontrado"
            );

        };

        if(!found.alm_Activo ){

            throw new AppException(
                400,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_READY_DISABLE,
                "Almacén actualmente deshabilitado"
            );

        };

        const result = await this.warehouseRepository.disable( id , idCurrentUser );

        return result;

    }

}