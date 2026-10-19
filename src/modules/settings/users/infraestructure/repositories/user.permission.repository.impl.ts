import { inject, injectable } from "tsyringe";
import type { UserPermissionRepository } from "../../domain/repositories/user.permission.repository.ts";
import type { UserPermissionEntity } from "../../domain/entities/user.permission.entity.ts";
import { USER_PERMISSION_TOKENS } from "../../container/user.permission.tokens.ts";
import type { Repository } from "typeorm";
import type { UserPermissionEntityDB } from "../database/user.permission.entity.db.ts";
import type { TCreateUserPermission, TUpdateUserPermission } from "../../types/user.type.ts";

@injectable()
export class UserPermissionRepositoryImpl implements UserPermissionRepository {

    constructor(
        @inject( USER_PERMISSION_TOKENS.REPOSITORY_DB )
        private readonly userPermissionRepositoryDB: Repository<UserPermissionEntityDB>
    ){}

    async update(idUser: number, permissions: TUpdateUserPermission[], idCurrentUser: number ): Promise<UserPermissionEntity[]> {

        const currentPermission = await this.userPermissionRepositoryDB.findBy({ peusua_UsuarioId: idUser });

        const deleted = currentPermission.reduce((ids: number[] , p ) => {

            const found = permissions.find((item) => item.peusua_OpcionId === p.peusua_OpcionId );

            if(!found){
                ids.push( p.peusua_Id );
            };

            return ids;

        }, [] );

        for (let index = 0; index < deleted.length; index++) {

            const id = deleted[index];
            await this.userPermissionRepositoryDB.delete({ peusua_Id: id });

        }

        for (let index = 0; index < permissions.length; index++) {

            const permission = permissions[index];

            const exist = await this.userPermissionRepositoryDB.findOneBy({ 
                peusua_UsuarioId: idUser,
                peusua_OpcionId: permission?.peusua_OpcionId
            });

            if(!exist){

                const permissionNew = this.userPermissionRepositoryDB.create({
                    peusua_UsuarioId: idUser,
                    peusua_CreacionId: idCurrentUser,
                    peusua_CambiarStatus: permission?.peusua_CambiarStatus,
                    peusua_Crear: permission?.peusua_Crear,
                    peusua_Editar: permission?.peusua_Editar,
                    peusua_OpcionId: permission?.peusua_OpcionId,
                    peusua_Activo: true
                });

                await this.userPermissionRepositoryDB.save( permissionNew );

            }else{

                await this.userPermissionRepositoryDB.update({ peusua_Id: exist.peusua_Id},{
                    ...permission,
                    peusua_ModificacionId: idCurrentUser
                });
                
            }
            
        }

        return await this.userPermissionRepositoryDB.findBy({
            peusua_UsuarioId: idUser
        });

    }

    async findByIdUser(idUser: number): Promise<UserPermissionEntity[]> {
        
        return await this.userPermissionRepositoryDB.findBy({
            peusua_UsuarioId: idUser
        });

    }

    async create(permissions: TCreateUserPermission[]): Promise<UserPermissionEntity[]> {
        
        for (let index = 0; index < permissions.length; index++) {

            const permission = permissions[index];
            const permissionNew = this.userPermissionRepositoryDB.create( {...permission} );

            await this.userPermissionRepositoryDB.save( permissionNew );
        }

        return await this.userPermissionRepositoryDB.findBy({ peusua_UsuarioId: permissions[0]?.peusua_UsuarioId ?? 0 });
    }
}