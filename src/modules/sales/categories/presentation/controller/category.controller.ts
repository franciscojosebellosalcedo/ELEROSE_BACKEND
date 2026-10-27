import { inject, injectable } from "tsyringe";
import type { CreateCategoryUseCase } from "../../application/create.category.use.case.ts";
import { CATEGORY_TOKENS } from "../../container/category.tokens.ts";
import type { Request, Response } from "express";
import { validateDTO } from "../../../../../shared/dto/validate.dto.ts";
import { SaveCategoryDTO, SearchCategoryDTO } from "../dto/category.dto.ts";
import { getCurrentUser } from "../../../../../shared/context/handler.current.user.ts";
import { responseHttp } from "../../../../../shared/reseponse/handler.response.ts";
import { CATEGORY_RESPONSE_CODE } from "../../../../../shared/reseponse/category.response.code.ts";
import type { UpdateCategoryUseCase } from "../../application/update.category.by.id.use.case.ts";
import type { GetRolByIdUseCase } from "../../../../settings/rols/application/get.rol.by.id.use.case.ts";
import type { PaginateCategoriesUseCase } from "../../application/paginate.category.use.case.ts";
import type { SearchCategoryByNameUseCase } from "../../application/search.category.use.case.ts";
import type { DisableCategoryUseCase } from "../../application/disable.category.by.id.ts";
import type { EnableCategoryUseCase } from "../../application/enable.category.by.id.use.case.ts";

@injectable()
export class CategoryController {

    constructor(
        @inject( CATEGORY_TOKENS.CREATE )
        private readonly createCategoryUseCase: CreateCategoryUseCase,

        @inject( CATEGORY_TOKENS.UPDATE )
        private readonly updateCategoryUseCase: UpdateCategoryUseCase,

        @inject( CATEGORY_TOKENS.GET_BY_ID )
        private readonly getByIdCategoryUseCase: GetRolByIdUseCase,

        @inject( CATEGORY_TOKENS.PAGINATE )
        private readonly paginateCategoryUseCase: PaginateCategoriesUseCase,

        @inject( CATEGORY_TOKENS.SEARCH )
        private readonly searchCategoryUseCase: SearchCategoryByNameUseCase,

        @inject( CATEGORY_TOKENS.DISABLE )
        private readonly disableCategoryUseCase: DisableCategoryUseCase,

        @inject( CATEGORY_TOKENS.ENABLE )
        private readonly enableCategoryUseCase: EnableCategoryUseCase

    ){}

    disable = async ( req: Request, res: Response ) =>{

        const id : number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const user = getCurrentUser( req );

        const result = await this.disableCategoryUseCase.execute( id , user.usua_Id );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_DISABLE,
            true,
            "Categoría deshabilitada",
            result
        ) );
        
    }

    enable = async ( req: Request, res: Response ) =>{

        const id : number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const user = getCurrentUser( req );

        const result = await this.enableCategoryUseCase.execute( id , user.usua_Id );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_ENABLE,
            true,
            "Categoría habilitada",
            result
        ) );

    }

    search = async ( req: Request, res: Response ) =>{

        const name = req.params.name;

        const dto = await validateDTO( SearchCategoryDTO, { name: name });

        const result = await this.searchCategoryUseCase.execute( dto.name );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_FOUND,
            true,
            "Categorías encontradas",
            result
        ) );

    };

    paginate = async ( req: Request, res: Response ) =>{

        const page: number = req.query.page && !isNaN( Number( req.query.page ) ) ? Number( req.query.page ): 1;
        const limit: number = req.query.limit && !isNaN( Number( req.query.limit ) ) ? Number( req.query.limit ): 20;

        const result = await this.paginateCategoryUseCase.execute( page, limit );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_PAGINATE,
            true,
            "Categorías paginadas",
            result
        ) );
        
    }

    getById = async ( req: Request, res: Response ) =>{

        const id: number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ): 0;

        const result = await this.getByIdCategoryUseCase.execute( id );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_FOUND,
            true,
            "Categoría encontrada",
            result
        ) );

    }

    update = async ( req: Request , res: Response ) =>{

        const id: number = req.params.id && !isNaN( Number( req.params.id ) ) ? Number( req.params.id ) : 0 ;

        const body = req.body;

        const user = getCurrentUser( req );

        const dto = await validateDTO( SaveCategoryDTO , body );

        const result = await this.updateCategoryUseCase.execute(id, {...dto, cate_ModificacionId: user.usua_Id } );

        return res.status( 200 ).json( responseHttp(
            200,
            CATEGORY_RESPONSE_CODE.CATEGORY_UPDATED,
            true,
            `Categoría editada`,
            result

        ) );
        
    }

    create = async ( req: Request , res: Response ) =>{

        const body = req.body;

        const user = getCurrentUser( req );

        const dto = await validateDTO( SaveCategoryDTO , body );

        const result = await this.createCategoryUseCase.execute( {...dto, cate_CreacionId: user.usua_Id } );

        return res.status( 201 ).json( responseHttp(
            201,
            CATEGORY_RESPONSE_CODE.CATEGORY_CREATED,
            true,
            `Categoría ${result.cate_Nombre} creada`,
            result

        ) );
        
    }

}