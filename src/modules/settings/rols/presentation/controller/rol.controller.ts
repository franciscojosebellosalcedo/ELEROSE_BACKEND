import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { getCurrentUser } from "../../../../../shared/context/handler.current.user.ts";
import { validateDTO } from "../../../../../shared/dto/validate.dto.ts";
import { responseHttp } from "../../../../../shared/reseponse/handler.response.ts";
import { ROL_RESPONSE_CODE } from "../../../../../shared/reseponse/rol.response.code.ts";
import type { CreateRolUseCase } from "../../application/create.rol.use.case.ts";
import type { DisableRolUseCase } from "../../application/disable.rol.use.case.ts";
import type { EnableRolUseCase } from "../../application/enable.rol.use.case.ts";
import type { GetRolByIdUseCase } from "../../application/get.rol.by.id.use.case.ts";
import type { PaginateRolUseCase } from "../../application/paginate.rol.use.case.ts";
import type { UpdateRolUseCase } from "../../application/update.rol.use.case.ts";
import { ROL_TOKENS } from "../../container/rol.tokens.ts";
import { DataSaveRolDTO } from "../dto/save.rol.dto.ts";
import { SearchRolDTO } from "../dto/search.rol.dto.ts";
import type { SearchRolUseCase } from "../../application/search.rol.use.case.ts";
import type { GetOnlyRolByIdUseCase } from "../../application/get.only.rol.by.id.use.case.ts";
import type { GetRolsActivesUseCase } from "../../application/get.rols.actives.use.case.ts";

@injectable()
export class RolController {

    constructor(

        @inject(ROL_TOKENS.CREATE_ROL_USE_CASE)
        private readonly createRolUseCase: CreateRolUseCase,

        @inject(ROL_TOKENS.GET_ROL_BY_ID)
        private readonly getRolByIdUseCase: GetRolByIdUseCase,

        @inject(ROL_TOKENS.PAGINATE)
        private readonly paginateUseCase: PaginateRolUseCase,

        @inject(ROL_TOKENS.DISABLE_ROL)
        private readonly disableRolUseCase: DisableRolUseCase,

        @inject(ROL_TOKENS.ENABLE_ROL)
        private readonly enableRolUseCase: EnableRolUseCase,

        @inject( ROL_TOKENS.UPDATE_ROL)
        private readonly updateRolUseCase: UpdateRolUseCase,

        @inject( ROL_TOKENS.SEARCH )
        private readonly searchRolUseCase: SearchRolUseCase,

        @inject( ROL_TOKENS.GET_ONLY_ROL_BY_ID )
        private readonly getOnlyRolUseCase: GetOnlyRolByIdUseCase,

        @inject( ROL_TOKENS.GET_ROLS_ACTIVES )
        private readonly getRolsActivesUseCase: GetRolsActivesUseCase

    ) { }

    getOnlyActives = async ( req: Request, res: Response ) =>{

        const result = await this.getRolsActivesUseCase.execute();
        
        return res.status( 200 ).json( responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_FOUND,
            true,
            "Roles activos",
            result
        ) );

    }

    search = async ( req: Request, res: Response ) =>{

        const name = req.query.name;

        const dto = await validateDTO( SearchRolDTO , {
            name
        } );

        const result = await this.searchRolUseCase.execute( dto.name );

        return res.status( 200 ).json( responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_FOUND,
            true,
            "Roles encontrados",
            result
        ) );

    }

    update = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const body = req.body;

        const user = getCurrentUser(req);

        const dto = await validateDTO(DataSaveRolDTO, body);

        const result = await this.updateRolUseCase.execute(id, dto, user.usua_Id);

        return res.status( 200 ).json(

            responseHttp(
                200,
                ROL_RESPONSE_CODE.ROL_UPDATED,
                true,
                `Rol editado`,
                result
            )

        );

    };

    enable = async (req: Request, res: Response) => {

        const user = getCurrentUser(req);

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const rolEnabled = await this.enableRolUseCase.execute(id, user.usua_Id);

        return res.status(200).json(responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_ENABLE,
            true,
            `Rol ${rolEnabled?.rol_Nombre} habilitado`,
            rolEnabled
        ));

    }

    disable = async (req: Request, res: Response) => {

        const user = getCurrentUser(req);

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const rolDisabled = await this.disableRolUseCase.execute(id, user.usua_Id);

        return res.status(200).json(responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_DISABLE,
            true,
            `Rol ${rolDisabled?.rol_Nombre} deshabilitado`,
            rolDisabled
        ));

    }

    paginate = async (req: Request, res: Response) => {

        const page: number = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;

        const limit: number = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 20;

        const result = await this.paginateUseCase.execute(page, limit);

        return res.status(200).json(responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_PAGINATE_SUCCESS,
            true,
            "Roles paginado correctamente",
            result
        ));

    }

    create = async (req: Request, res: Response) => {

        const body = req.body;

        const user = getCurrentUser(req);

        const dto = await validateDTO(DataSaveRolDTO, body);

        const result = await this.createRolUseCase.execute(dto, user.usua_Id);

        return res.status(201).json(responseHttp(
            201,
            ROL_RESPONSE_CODE.ROL_CREATED,
            true,
            `Rol ${dto.rol.rol_Nombre} creado`,
            result
        ));
    };

    getRolById = async (req: Request, res: Response) => {

        const id: number = Number(req.params.id);

        const result = await this.getRolByIdUseCase.execute(id);

        return res.status(200).json(responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_FOUND,
            true,
            "Rol encontrado",
            result
        ));

    }

    getOnlyRolById = async (req: Request, res: Response) => {

        const id: number = Number(req.params.id);

        const result = await this.getOnlyRolUseCase.execute(id);

        return res.status(200).json(responseHttp(
            200,
            ROL_RESPONSE_CODE.ROL_FOUND,
            true,
            "Rol encontrado",
            result
        ));

    }
}