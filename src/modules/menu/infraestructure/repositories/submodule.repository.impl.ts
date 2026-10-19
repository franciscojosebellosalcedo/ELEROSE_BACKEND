import { inject, injectable } from "tsyringe";
import type { Repository } from "typeorm";
import { SUBMODULE_TOKENS } from "../../container/menu.container.tokens.ts";
import type { SubmoduleRepository } from "../../domain/repositories/submodule.repository.ts";
import type { TSubmoduleMenu } from "../../types/menu.type.ts";
import type { SubmoduleEntityDB } from "../database/submodule.entity.db.ts";

@injectable()
export class SubmoduleRepositoryImpl implements SubmoduleRepository {

    constructor(

        @inject( SUBMODULE_TOKENS.REPOSITORY_DB )
        private readonly submoduleRepositoryDB: Repository<SubmoduleEntityDB>

    ){}

    async create(submodules: TSubmoduleMenu[]): Promise<void> {

        submodules.map( async (submodule) => {

            const exist = await this.submoduleRepositoryDB.findOneBy({ submo_Codigo: submodule?.submo_Codigo });
            if(!exist){

                const submoduleNew = this.submoduleRepositoryDB.create({
                    ...submodule
                });

                await this.submoduleRepositoryDB.save( submoduleNew );

            }

        });

    }

}