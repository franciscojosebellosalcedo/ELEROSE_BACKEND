import { inject, injectable } from "tsyringe";
import type { CreateWarehouseUseCase } from "../../application/create.warehouse.use.case.ts";
import { WAREHOUSE_TOKENS } from "../../container/warehouse.container.tokens.ts";
import type { Request, Response } from "express";
import { getCurrentUser } from "../../../../../shared/context/handler.current.user.ts";
import { validateDTO } from "../../../../../shared/dto/validate.dto.ts";
import { SaveWarehouseDTO, SearchWarehouseDTO } from "../dto/warehouse.dto.ts";
import { responseHttp } from "../../../../../shared/reseponse/handler.response.ts";
import { WAREHOUSE_RESPONSE_CODE } from "../../../../../shared/reseponse/warehouse.response.code.ts";
import type { UpdateWarehouseUseCase } from "../../application/update.warehouse.use.case.ts";
import type { GetWarehouseByIdUseCase } from "../../application/get.warehouse.by.id.use.case.ts";
import type { SearchWarehouseUseCase } from "../../application/search.warehouse.use.case.ts";
import type { DisableWarehouseByIdUseCase } from "../../application/disable.warehouse.by.id.use.case.ts";
import type { EnableWarehouseByIdUseCase } from "../../application/enable.warehouse.by.id.use.case.ts";
import type { PaginateWarehouseUseCase } from "../../application/paginate.warehouse.use.case.ts";

@injectable()
export class WarehouseController {

    constructor(

        @inject(WAREHOUSE_TOKENS.CREATE)
        private readonly createWarehouseUseCase: CreateWarehouseUseCase,

        @inject(WAREHOUSE_TOKENS.UPDATE)
        private readonly updateWarehouseUseCase: UpdateWarehouseUseCase,

        @inject(WAREHOUSE_TOKENS.GET_BY_ID)
        private readonly getWarehouseByIdUseCase: GetWarehouseByIdUseCase,

        @inject(WAREHOUSE_TOKENS.SEARCH)
        private readonly searchWarehouseUseCase: SearchWarehouseUseCase,

        @inject(WAREHOUSE_TOKENS.DISABLE)
        private readonly disableWarehouseUseCase: DisableWarehouseByIdUseCase,

        @inject(WAREHOUSE_TOKENS.ENABLE)
        private readonly enableWarehouseUseCase: EnableWarehouseByIdUseCase,

        @inject(WAREHOUSE_TOKENS.PAGINATE)
        private readonly paginateWarehouseUseCase: PaginateWarehouseUseCase

    ) { };

    paginate = async ( req: Request, res: Response ) =>{

        const page: number = req.query.page && !isNaN( Number( req.query.page ) ) ? Number( req.query.page ): 1;
        const limit: number = req.query.limit && !isNaN( Number( req.query.limit ) ) ? Number( req.query.limit ): 20;

        const result = await this.paginateWarehouseUseCase.execute( page, limit );

        return res.status( 200 ).json( responseHttp( 
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_PAGINATE,
            true,
            "Almacenes paginados",
            result
            
        ) );
    }

    disable = async ( req: Request, res: Response ) =>{

        const id: number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const user = getCurrentUser( req );

        const result = await this.disableWarehouseUseCase.execute( id , user.usua_Id );

        return res.status( 200 ).json( responseHttp(
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_DISABLE,
            true,
            `Almacén ${result?.alm_Nombre} deshabilitado`,
            result
            
        ) );
    }

    enable = async ( req: Request, res: Response ) =>{

        const id: number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const user = getCurrentUser( req );

        const result = await this.enableWarehouseUseCase.execute( id , user.usua_Id );

        return res.status( 200 ).json( responseHttp(
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_ENABLE,
            true,
            `Almacén ${result?.alm_Nombre} habilitado`,
            result

        ) );
    }

    search = async ( req: Request, res: Response ) =>{

        const value = req.params.name;

        const dto = await validateDTO( SearchWarehouseDTO, { name: value } );

        const result = await this.searchWarehouseUseCase.execute( dto.name );

        return res.status( 200 ).json( responseHttp(
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_FOUND,
            true,
            "Almacenes encontrados",
            result
        ) );

    }

    getById = async ( req: Request, res: Response ) => {

        const id: number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const result = await this.getWarehouseByIdUseCase.execute( id );

        return res.status( 200 ).json( responseHttp(
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_FOUND,
            true,
            "Almacén encontrado",
            result
        ) );
    }

    create = async (req: Request, res: Response) => {

        const user = getCurrentUser(req);

        const body = req.body;

        const dto = await validateDTO(SaveWarehouseDTO, body);

        const result = await this.createWarehouseUseCase.execute({
            ...dto,
            alm_CreacionId: user.usua_Id
        });

        return res.status(201).json(responseHttp(
            201,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_CREATED,
            true,
            "Almacén creado",
            result
        ));

    }

    update = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const user = getCurrentUser(req);

        const body = req.body;

        const dto = await validateDTO(SaveWarehouseDTO, body);

        const result = await this.updateWarehouseUseCase.execute(
            id,
            {
                ...dto,
                alm_ModificacionId: user.usua_Id
            }
        );

        return res.status(200).json(responseHttp(
            200,
            WAREHOUSE_RESPONSE_CODE.WAREHOUSE_UPDATED,
            true,
            "Almacén editado",
            result
        ));

    }

}