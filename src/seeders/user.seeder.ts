import { inject, injectable } from "tsyringe";
import type { Repository } from "typeorm";
import type { UserEntityDB } from "../modules/settings/users/infraestructure/database/user.entity.db.ts";
import { USER_TOKENS } from "../modules/settings/users/container/user.container.tokens.ts";
import { UserEntity } from "../modules/settings/users/domain/entities/user.entity.js";
import { Security } from "../shared/security.ts";

@injectable()
export class UserSeeder {

    constructor(
        @inject( USER_TOKENS.REPOSITORY_DB )
        private readonly userRepositoryDB: Repository<UserEntityDB>
    ){

    }

    execute = async () =>{
        try {

            const users: UserEntity[] = [
                new UserEntity(
                    null , "Sistema", "system", "systemedifix", "SYSTEM", true, 0 , 0 , 0 , new Date(), new Date()
                ),
                new UserEntity(
                    null , "Administrador", "admin", "admin2024", "ADMIN", true, 1, 1, 0 , new Date(), new Date()
                )
            ];

            let count = 0;

            for (let index = 0; index < users.length; index++) {

                const user = users[index];
                const passwordHash = Security.hasPassword( user?.usua_Contrasenia ?? "" );

                const userFound = await this.userRepositoryDB.findOneBy({
                    usua_Codigo: user?.usua_Codigo
                });

                if(!userFound){

                    const userNew = this.userRepositoryDB.create({
                        usua_Nombre: user?.usua_Nombre,
                        usua_NombreUsuario: user?.usua_NombreUsuario,
                        usua_Codigo: user?.usua_Codigo,
                        usua_Contrasenia: passwordHash,
                        usua_CreacionId: user?.usua_CreacionId,
                        usua_RolId: user?.usua_RolId
                    });

                    await this.userRepositoryDB.save( userNew );

                    count ++;
                }
                
            }

            console.log(`Seeder users execute (${count}) users created`);
            
        } catch (error) {
            
            console.error("Error during execute seeder users: ", error );
            
        }
    }
}