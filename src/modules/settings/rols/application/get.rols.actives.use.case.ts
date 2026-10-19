import { inject, injectable } from "tsyringe";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import { ROL_TOKENS } from "../container/rol.tokens.ts";

@injectable()
export class GetRolsActivesUseCase {

    constructor(

        @inject( ROL_TOKENS.REPOSITORY )
        private readonly rolRepository: RolRepository,

    ){}

    async execute(){
        return await this.rolRepository.findOnlyActives();
    }
}