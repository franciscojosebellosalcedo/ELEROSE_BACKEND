import { inject, injectable } from "tsyringe";
import type { WarehouseRepository } from "../domain/repositories/warehouse.repository.ts";
import { WAREHOUSE_TOKENS } from "../container/warehouse.container.tokens.ts";

@injectable()
export class PaginateWarehouseUseCase {

    constructor(

        @inject(WAREHOUSE_TOKENS.REPOSITORY )
        private readonly warehouseRepository: WarehouseRepository

    ){};

    async execute( page: number, limit: number ){

        return await this.warehouseRepository.paginate( page, limit );

    };

}