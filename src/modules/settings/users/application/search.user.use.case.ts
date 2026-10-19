import type { UserRepository } from "../domain/repositories/user.repository.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";
import { inject, injectable } from "tsyringe";
import { AppException } from "../../../../shared/errors/handler.error.ts";
import { USERS_CODE } from "../../../../shared/constant.ts";
import { USER_RESPONSE_CODE } from "../../../../shared/reseponse/user.response.code.ts";

@injectable()
export class SearchUserUseCase {

    constructor(

        @inject(USER_TOKENS.REPOSITORY)
        private readonly userRepository: UserRepository

    ) { }

    async execute(name: string) {
        
        const result = await this.userRepository.search(name);

        if (!result.length) {

            throw new AppException(
                404,
                USER_RESPONSE_CODE.USER_NOT_FOUND,
                "No se encontraron usuarios"
            );

        }

        return result;
    }

}