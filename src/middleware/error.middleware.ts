import type { NextFunction, Request, Response } from "express";
import { AppException } from "../shared/errors/handler.error.ts";
import { responseHttp } from "../shared/reseponse/handler.response.ts";
import { ERROR_RESPONSE_CODE } from "../shared/errors/error.response.code.ts";

export const errorMiddleware = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    
    console.log(error);
    
    if (error instanceof AppException) {
        return res.status(
            error.statusCode
        ).json(
            responseHttp(
                error.statusCode, error.code, false, error.message, null
            )
        )
    }

    return res.status(
        500
    ).json(
        responseHttp(
            500, ERROR_RESPONSE_CODE.ERROR_INTERNAL, false, "Error en el servidor", null
        )
    )

}