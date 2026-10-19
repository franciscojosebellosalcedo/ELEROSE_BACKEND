import { inject, injectable } from "tsyringe";
import type { RolRepository } from "../domain/repositories/rol.repository.ts";
import { ROL_TOKENS } from "../container/rol.tokens.ts";

@injectable()
export class SearchRolUseCase {

    constructor(

        @inject( ROL_TOKENS.REPOSITORY )
        private readonly rolRepository: RolRepository

    ){}

    async execute ( name: string ){

        return await this.rolRepository.search( name );
        
    };
    
}