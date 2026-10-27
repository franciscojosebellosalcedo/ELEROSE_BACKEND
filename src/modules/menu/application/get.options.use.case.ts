import { inject, injectable } from "tsyringe";
import { OPTION_TOKENS } from "../container/menu.container.tokens.ts";
import type { OptionRepository } from "../domain/repositories/option.repository.ts";

@injectable()
export class GetOptionsUseCase {

    constructor(

        @inject( OPTION_TOKENS.REPOSITORY )
        private readonly optionRepository: OptionRepository

    ){}

    async execute(){
        return await this.optionRepository.find();
    }
}