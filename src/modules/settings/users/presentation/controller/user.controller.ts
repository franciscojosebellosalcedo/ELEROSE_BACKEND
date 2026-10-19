import type { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { getCurrentUser } from "../../../../../shared/context/handler.current.user.ts";
import { validateDTO } from "../../../../../shared/dto/validate.dto.ts";
import { responseHttp } from "../../../../../shared/reseponse/handler.response.ts";
import { USER_RESPONSE_CODE } from "../../../../../shared/reseponse/user.response.code.ts";
import type { CreateUserUseCase } from "../../application/create.user.use-case.ts";
import type { DisableUserUseCase } from "../../application/disable.user.use.case.ts";
import type { EnableUserUseCase } from "../../application/enable.user.use.case.ts";
import type { GetOnlyUserByIdUseCase } from "../../application/get.only.user.by.id.use.case.ts";
import type { GetUserByIdUseCase } from "../../application/get.user.by.id.use.case.ts";
import type { PaginateUserUseCase } from "../../application/paginate.user.use.case.ts";
import type { SearchUserUseCase } from "../../application/search.user.use.case.ts";
import type { UpdateUserByIdUseCase } from "../../application/update.user.by.id.use.case.ts";
import { USER_TOKENS } from "../../container/user.container.tokens.ts";
import { DataSaveUser } from "../dto/create.user.dto.ts";
import { SearchUserDTO } from "../dto/search.user.dto.ts";

@injectable()
export class UserController {

    constructor(
        @inject(USER_TOKENS.CREATE_USE_CASE)
        private readonly createUserUseCase: CreateUserUseCase,

        @inject(USER_TOKENS.PAGINATE)
        private readonly paginateUserUseCase: PaginateUserUseCase,

        @inject(USER_TOKENS.SEARCH)
        private readonly searchUserUseCase: SearchUserUseCase,

        @inject(USER_TOKENS.DISABLE)
        private readonly disableUserUseCase: DisableUserUseCase,

        @inject(USER_TOKENS.ENABLE)
        private readonly enableUserUseCase: EnableUserUseCase,

        @inject(USER_TOKENS.GET_USER_BY_ID)
        private readonly getUserByIdUseCase: GetUserByIdUseCase,

        @inject(USER_TOKENS.GET_ONLLY_USER_BY_ID)
        private readonly getOnlyUserByIdUseCase: GetOnlyUserByIdUseCase,

        @inject(USER_TOKENS.UPDATE_USER_BY_ID)
        private readonly updateUserByIdUseCase: UpdateUserByIdUseCase

    ) {

    }

    update = async (req: Request, res: Response) => {

        const currentUser = getCurrentUser(req);

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const body = req.body;

        const dto = await validateDTO(DataSaveUser, body);

        const result = await this.updateUserByIdUseCase.execute(
            id,
            {
                user: dto.user,
                permissions: dto.permissions

            },
            currentUser.usua_Id
        );

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_UPDATED,
            true,
            "Usuario editado",
            result
        ));

    };

    getUserById = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const result = await this.getUserByIdUseCase.execute(id);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_FOUND,
            true,
            "Usuario encontrado",
            result
        ));

    };

    getOnlyUserById = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const result = await this.getOnlyUserByIdUseCase.execute(id);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_FOUND,
            true,
            "Usuario encontrado",
            result
        ));

    };

    paginate = async (req: Request, res: Response) => {

        const page: number = req.query.page && !isNaN(Number(req.query.page)) ? Number(req.query.page) : 1;

        const limit: number = req.query.limit && !isNaN(Number(req.query.limit)) ? Number(req.query.limit) : 20;

        const result = await this.paginateUserUseCase.execute(page, limit);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_PAGINATE_SUCCESS,
            true,
            "Usuarios paginados",
            result
        ));
    }

    disable = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const user = getCurrentUser(req);

        const result = await this.disableUserUseCase.execute(id, user.usua_Id);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_DISABLE_SUCCESS,
            true,
            `Usuario ${result?.usua_Nombre} deshabilitado`,
            result
        ));
    }

    enable = async (req: Request, res: Response) => {

        const id: number = req.params.id && !isNaN(Number(req.params.id)) ? Number(req.params.id) : 0;

        const user = getCurrentUser(req);

        const result = await this.enableUserUseCase.execute(id, user.usua_Id);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_ENABLE_SUCCESS,
            true,
            `Usuario ${result?.usua_Nombre} habilitado`,
            result
        ));
    }

    search = async (req: Request, res: Response) => {

        const name = req.query.name;

        const dto = await validateDTO(SearchUserDTO, { name });

        const result = await this.searchUserUseCase.execute(dto.name);

        return res.status(200).json(responseHttp(
            200,
            USER_RESPONSE_CODE.USER_FOUND,
            true,
            "Usuarios encontrados",
            result
        ));

    }

    create = async (req: Request, res: Response) => {

        const currentUser = getCurrentUser(req);

        const dto = await validateDTO(DataSaveUser, req.body);

        const { user, permissions } = dto;

        const result = await this.createUserUseCase.execute(
            {
                user,
                permissions
            },
            currentUser.usua_Id
        );

        return res.status(201).json(
            responseHttp(201, USER_RESPONSE_CODE.USER_CREATED, true, "Usuario creado", result)
        );

    }
}