import { inject, injectable } from "tsyringe";
import type { GetMenuUseCase } from "../../application/get.menu.use.case.ts";
import { MENU_TOKENS, OPTION_TOKENS } from "../../container/menu.container.tokens.ts";
import type { Request, Response } from "express";
import type { TMenu, TOptionMenu } from "../../types/menu.type.ts";
import { responseHttp } from "../../../../shared/reseponse/handler.response.ts";
import { MENU_RESPONSE_CODE } from "../../../../shared/reseponse/menu.response.code.ts";
import type { GetOptionsUseCase } from "../../application/get.options.use.case.ts";

@injectable()
export class MenuController {

    constructor(

        @inject(MENU_TOKENS.GET_MENU_USE_CASE)
        private readonly getMenuUseCase: GetMenuUseCase,

        @inject(OPTION_TOKENS.GET_OPTIONS_USE_CASE)
        private readonly getOptionsUseCase: GetOptionsUseCase
    ){}

    getMenu = async ( req: Request, res: Response ) =>{
        
        const menu: TMenu[] = await this.getMenuUseCase.execute();

        return res.status( 200 ).json(
            responseHttp( 200 , MENU_RESPONSE_CODE.MENU_FIND_SUCCESS, true , "Menu obtenido correctamente", menu )
        );
        
    }

    getOptions = async ( req: Request, res: Response ) =>{
        
        const options = await this.getOptionsUseCase.execute();

        return res.status( 200 ).json(
            responseHttp( 200 , MENU_RESPONSE_CODE.OPTIONS_FIND_SUCCESS, true , "Opciones obtenido correctamente", options )
        );
        
    }
}