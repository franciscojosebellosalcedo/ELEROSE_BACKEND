import { inject, injectable } from "tsyringe";
import type { UserRepository } from "../domain/repositories/user.repository.ts";
import { USER_TOKENS } from "../container/user.container.tokens.ts";

@injectable()
export class PaginateUserUseCase {

    constructor(
        @inject( USER_TOKENS.REPOSITORY )
        private readonly userRepository: UserRepository
    ){}

    async execute( page: number , limit: number ){
        return this.userRepository.paginate( page , limit );
    }

}