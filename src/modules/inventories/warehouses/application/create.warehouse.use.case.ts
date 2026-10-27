import { inject, injectable } from "tsyringe";
import type { WarehouseRepository } from "../domain/repositories/warehouse.repository.ts";
import { WAREHOUSE_TOKENS } from "../container/warehouse.container.tokens.ts";
import type { TCreateWarehouse } from "../types/warehouse.type.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { WAREHOUSE_RESPONSE_CODE } from "../../../../shared/reseponse/warehouse.response.code.ts";

@injectable()
export class CreateWarehouseUseCase {

    constructor(

        @inject( WAREHOUSE_TOKENS.REPOSITORY )
        private readonly warwhouseRepository: WarehouseRepository

    ){}

    async execute( values: TCreateWarehouse ){

        const exist = await this.warwhouseRepository.findByName( values.alm_Nombre );

        if(exist){

            throw new AppException(
                400,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_READY_EXIST,
                "Almacén existente"
            );

        };

        return await this.warwhouseRepository.create( values );

    }

}