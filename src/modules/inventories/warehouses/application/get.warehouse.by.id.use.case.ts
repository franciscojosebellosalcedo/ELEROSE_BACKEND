import { inject, injectable } from "tsyringe";
import { WAREHOUSE_TOKENS } from "../container/warehouse.container.tokens.ts";
import type { WarehouseRepository } from "../domain/repositories/warehouse.repository.ts";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { WAREHOUSE_RESPONSE_CODE } from "../../../../shared/reseponse/warehouse.response.code.ts";
import { ERROR_RESPONSE_CODE } from "../../../../shared/errors/error.response.code.ts";

@injectable()
export class GetWarehouseByIdUseCase {

    constructor(

        @inject(WAREHOUSE_TOKENS.REPOSITORY)
        private readonly warehouseRepository: WarehouseRepository

    ) { }

    async execute(id: number) {

        if (!id) {

            throw new AppException(
                404,
                ERROR_RESPONSE_CODE.ERROR_IDENTIFIED_NOT_VALID,
                "Identificador incorrecto"
            );

        };

        const warehouseFound = await this.warehouseRepository.findById(id);

        if(!warehouseFound){

            throw new AppException(
                404,
                WAREHOUSE_RESPONSE_CODE.WAREHOUSE_NOT_FOUND,
                "Almacén no encontrado"
            );

        };

        return warehouseFound;

    }

}