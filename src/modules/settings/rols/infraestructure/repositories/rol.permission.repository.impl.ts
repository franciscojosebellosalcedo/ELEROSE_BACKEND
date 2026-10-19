import { inject, injectable } from "tsyringe";
import type { Repository } from "typeorm";
import { ROL_PERMISSION_TOKENS } from "../../container/rol.permission.tokens.ts";
import type { RolPermissionEntity } from "../../domain/entities/rol.permission.entity.ts";
import type { RolPermissionRepository } from "../../domain/repositories/rol.permission.repository.ts";
import type { TCreateRolPermission, TUpdateRolPermission } from "../../types/rol.type.ts";
import type { RolPermissionEntityDB } from "../database/rol.permission.entity.db.ts";

@injectable()
export class RolPermissionRepositoryImpl implements RolPermissionRepository {

    constructor(
        @inject( ROL_PERMISSION_TOKENS.REPOSITORY_DB )
        private readonly rolPermissionRepositoryDB: Repository<RolPermissionEntityDB>
    ){}

    async update( idRol: number , permissions: TUpdateRolPermission[], idCurrentUser: number ): Promise<RolPermissionEntity[]> {
        
        const currentPermission = await this.findByIdRol( idRol );

        const deleted = currentPermission.reduce((listItems: RolPermissionEntity[] , item) => {

            const found = permissions.find((it) => it.perol_OpcionId === item.perol_OpcionId );

            if(!found){
                listItems.push( item );
            }

            return listItems;

        } , [ ] );

        for (let index = 0; index < deleted.length; index++) {
            
            const item = deleted[index];

            if(item?.perol_Id){

                await this.rolPermissionRepositoryDB.delete({
                    perol_Id: item.perol_Id
                });

            }
            
        }

        for (let index = 0; index < permissions.length; index++) {

            const item = permissions[index];
    
            const exit = await this.rolPermissionRepositoryDB.findOneBy({
                perol_OpcionId: item?.perol_OpcionId,
                perol_RolId: idRol
            });

            if(!exit){

                const rolPermissionNew = this.rolPermissionRepositoryDB.create({
                    ...item,
                    perol_CreacionId: idCurrentUser,
                    perol_RolId: idRol
                });

                await this.rolPermissionRepositoryDB.save( rolPermissionNew );

            }else{

                await this.rolPermissionRepositoryDB.update({ perol_Id: exit.perol_Id},{
                    ...item
                });

            }

        }

        return await this.findByIdRol( idRol );
    }

    async create(permissions: TCreateRolPermission[]): Promise<RolPermissionEntity[]> {
        
        for (let index = 0; index < permissions.length; index++) {

            const permission = permissions[index];
            const permissionNew = this.rolPermissionRepositoryDB.create( {...permission} );

            await this.rolPermissionRepositoryDB.save( permissionNew );
        }

        return await this.rolPermissionRepositoryDB.findBy({ perol_RolId: permissions[0]?.perol_RolId ?? 0 });
        
    }

    async findByIdRol(idRol: number): Promise<RolPermissionEntity[]> {

        return await this.rolPermissionRepositoryDB.findBy({ perol_RolId: idRol });
        
    }

}