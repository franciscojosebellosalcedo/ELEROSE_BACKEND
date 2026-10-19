import { inject, injectable } from "tsyringe";
import { ILike, In, Not, type EntityManager, type Repository } from "typeorm";
import { ROLS_CODE, USERS_CODE } from "../../../../../shared/constant.ts";
import { DATABASE_TOKENS } from "../../../../../shared/database/database.container.tokens.ts";
import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import type { UserEntity } from "../../domain/entities/user.entity.ts";
import type { UserRepository } from "../../domain/repositories/user.repository.ts";
import type { TCreateUser, TUpdateUser } from "../../types/user.type.ts";
import { UserEntityDB } from "../database/user.entity.db.js";

@injectable()
export class UserRepositoryImpl implements UserRepository {

    private userRepositoryDB : Repository<UserEntityDB>;

    constructor(
        @inject(DATABASE_TOKENS.ENTITY_MANAGER)
        private readonly manager: EntityManager
    ) {

        this.userRepositoryDB = this.manager.getRepository( UserEntityDB );

    }

    async disable(id: number, idCurrentUser: number ): Promise<UserEntity | null> {

        await this.userRepositoryDB.update({ usua_Id: id }, {
            usua_ModificacionId: idCurrentUser,
            usua_Activo: false
        });

        return await this.userRepositoryDB.findOneBy({ usua_Id: id });
    }

    async findByNameExludeId(nameUser: string, idExlude: number): Promise<UserEntity | null> {

        return await this.userRepositoryDB.findOneBy({
            usua_Id: Not( In([ idExlude ])),
            usua_NombreUsuario: ILike(`%${nameUser}%`)
        });
        
    }

    async update(id: number, values: TUpdateUser): Promise<UserEntity | null> {

        await this.userRepositoryDB.update({ usua_Id: id },{
            ...values
        });

        return await this.userRepositoryDB.findOneBy({ usua_Id: id });
    }

    async enable(id: number, idCurrentUser: number ): Promise<UserEntity | null> {

        await this.userRepositoryDB.update({ usua_Id: id }, {
            usua_ModificacionId: idCurrentUser,
            usua_Activo: true
        });

        return await this.userRepositoryDB.findOneBy({ usua_Id: id }); 

    }

    async search( value: string ){

        return await this.userRepositoryDB.find({
            where: [
                { usua_Nombre: ILike(`%${value}%`), usua_Codigo: Not( In( [ ROLS_CODE.ADMIN ] ) )},
                { usua_NombreUsuario: ILike(`%${value}%`), usua_Codigo: Not( In( [ ROLS_CODE.ADMIN ] ) )}
            ],
            order: {
                usua_Creacion: "DESC"
            }
        });

    }

    async paginate(
        page: number,
        limit: number
    ): Promise<TPagination<UserEntity>> {

        const [records, total] = await this.userRepositoryDB
            .createQueryBuilder('user')
            .select([
                'user.usua_Id',
                'user.usua_Nombre',
                'user.usua_NombreUsuario',
                'user.usua_RolId',
                'user.usua_Activo',
                'user.usua_Codigo',
                'user.usua_Creacion',
                'user.usua_Modificacion',
                'user.usua_CreacionId',
                'user.usua_ModificacionId',
            ])
            .where(`user.usua_Codigo NOT IN (:...codes)`, {
                codes: [USERS_CODE.ADMIN, USERS_CODE.SYSTEM]
            })
            .take(limit)
            .skip((page - 1) * limit)
            .orderBy("user.usua_Creacion", "DESC")
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);

        return {
            limit,
            page,
            records,
            total,
            totalPages,
            totalRecords: total,
        };
    }

    async findById(id: number): Promise<UserEntity | null> {
        return await this.userRepositoryDB.findOneBy({ usua_Id: id });
    }

    async create(values: TCreateUser): Promise<UserEntity> {

        const newUser = this.userRepositoryDB.create(values);
        return await this.userRepositoryDB.save(newUser);

    }

    async findByNameUser(nameUser: string): Promise<UserEntity | null> {
        return await this.userRepositoryDB.findOneBy({ usua_NombreUsuario: nameUser });
    }
}