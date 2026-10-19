import { inject, injectable } from "tsyringe";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import { ROL_TOKENS } from "../container/rol.tokens.ts";

@injectable()
export class GetOnlyRolByIdUseCase {

    constructor(
        @inject( ROL_TOKENS.REPOSITORY )
        private readonly rolRepository: RolRepository
    ){}

    async execute( id: number ){
        return this.rolRepository.findById( id );
    }
}