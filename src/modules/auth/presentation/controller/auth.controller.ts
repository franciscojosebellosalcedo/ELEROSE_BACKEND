import { inject, injectable } from "tsyringe";
import type { LoginUseCase } from "../../application/login.use.case.ts";
import { AUTH_TOKENS } from "../../container/auth.container.tokens.ts";
import type { Request, Response } from "express";
import { validateDTO } from "../../../../shared/dto/validate.dto.ts";
import { LoginDTO } from "../dto/login.dto.ts";
import { responseHttp } from "../../../../shared/reseponse/handler.response.ts";
import { AUTH_RESPONSE_CODE } from "../../../../shared/reseponse/auth.response.code.ts";
import type { RefressSessionUseCase } from "../../application/refress.session.use.case.ts";
import { RefressSessionDTO } from "../dto/refress.session.dto.ts";

@injectable()
export class AuthController {

    constructor(

        @inject( AUTH_TOKENS.LOGIN_USE_CASE )
        private readonly loginCaseUse: LoginUseCase,

        @inject( AUTH_TOKENS.REFRESS_SESSION )
        private readonly refressSessionUseCase: RefressSessionUseCase
        
    ){}

    refressSession = async ( req: Request, res: Response  ) =>{

        const body = req.body;

        const dto = await validateDTO( RefressSessionDTO , body );

        const result = await this.refressSessionUseCase.execute( dto.token );

        return res.status( 200 ).json(
            responseHttp(
                200 , AUTH_RESPONSE_CODE.AUTH_REFRESS_SESSION_SUCCESS, true, "Sesión actualizada", result 
            )
        )
    };

    login = async ( req: Request, res: Response) =>{

        const body = req.body;

        const dto = await validateDTO( LoginDTO, body );

        const result = await this.loginCaseUse.execute( dto );

        return res.status(200).json(

            responseHttp(
                200 , AUTH_RESPONSE_CODE.AUTH_LOGIN_SUCCESS, true , "Login correctamente", result
            )

        )

    }
}