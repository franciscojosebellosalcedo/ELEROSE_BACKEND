import type { Repository } from "typeorm";
import type { OptionEntity } from "../../domain/entities/option.entity.ts";
import type { OptionRepository } from "../../domain/repositories/option.repository.ts";
import type { TOptionMenu } from "../../types/menu.type.ts";
import type { OptionEntityDB } from "../database/option.entity.db.ts";
import { inject, injectable } from "tsyringe";
import { OPTION_TOKENS } from "../../container/menu.container.tokens.ts";

@injectable()
export class OptionRepositoryImpl implements OptionRepository {

    constructor(

        @inject( OPTION_TOKENS.REPOSITORY_DB )
        private readonly optionRepositoryDB: Repository<OptionEntityDB>

    ){}

    async find(): Promise<OptionEntity[]> {
        return await this.optionRepositoryDB.find();
    }

    async createOptions(options: TOptionMenu[]): Promise<void> {

        options.map( async (option) => {

            const exist = await this.optionRepositoryDB.findOneBy({ opcion_Codigo: option?.opcion_Codigo });
            if(!exist){

                const optionNew = this.optionRepositoryDB.create({
                    ...option
                });

                await this.optionRepositoryDB.save( optionNew );

            }

        });

    }

    async findOptionByCode(code: string): Promise<OptionEntity | null> {
        return await this.optionRepositoryDB.findOneBy({ opcion_Codigo: code });
    }

    async findOptionById(id: number): Promise<OptionEntity | null> {
        return await this.optionRepositoryDB.findOneBy({ opcion_Id: id });
    }

    async findOptionsBySubmoduleId(idSubmodule: number): Promise<OptionEntity[]> {
        return await this.optionRepositoryDB.findBy({ opcion_SubmoduloId: idSubmodule });
    }

}