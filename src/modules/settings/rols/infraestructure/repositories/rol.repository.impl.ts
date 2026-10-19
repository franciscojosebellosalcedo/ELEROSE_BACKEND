import { inject, injectable } from "tsyringe";
import { EntityManager, ILike, In, Like, Not, type Repository } from "typeorm";
import { DATABASE_TOKENS } from "../../../../../shared/database/database.container.tokens.ts";
import type { RolEntity } from "../../domain/entities/rol.entity.ts";
import type { RolRepository } from "../../domain/repositories/rol.repository.ts";
import type { TCreateRol, TUpdateRol } from "../../types/rol.type.ts";
import { RolEntityDB } from "../database/rol.entity.db.js";
import type { TPagination } from "../../../../../shared/types/pagination.type.ts";

@injectable()
export class RolRepositoryImpl implements RolRepository {

    private rolRepositoryDB: Repository<RolEntityDB>;

    constructor(
        @inject(DATABASE_TOKENS.ENTITY_MANAGER)
        private readonly manager: EntityManager
    ) {
        this.rolRepositoryDB = this.manager.getRepository(RolEntityDB);
    }

    async findOnlyActives(): Promise<RolEntity[]> {

        return await this.rolRepositoryDB.findBy({
            rol_Activo: true
        });

    }

    async search(name: string): Promise<RolEntity[]> {

        return await this.rolRepositoryDB.findBy({
            rol_Nombre: ILike(`%${name.trim()}%`)
        });

    }

    async existByNameExludeById(name: string, idExclude: number): Promise<RolEntity | null> {

        return await this.rolRepositoryDB.findOneBy({
            rol_Id: Not(In([idExclude])),
            rol_Nombre: name
        });

    }

    async disable(id: number, idUser: number): Promise<RolEntity | null> {

        await this.rolRepositoryDB.update({ rol_Id: id }, {
            rol_Activo: false,
            rol_ModificacionId: idUser
        });

        return await this.rolRepositoryDB.findOneBy({ rol_Id: id });
    }

    async enable(id: number, idUser: number): Promise<RolEntity | null> {

        await this.rolRepositoryDB.update({ rol_Id: id }, {
            rol_Activo: true,
            rol_ModificacionId: idUser
        });

        return await this.rolRepositoryDB.findOneBy({ rol_Id: id });
    }

    async paginate(page: number, limit: number): Promise<TPagination<RolEntity>> {

        const [data, total] = await this.rolRepositoryDB.findAndCount({
            take: limit,
            skip: (page - 1) * limit,
            order: {
                rol_Creacion: "DESC"
            }
        });

        const totalPages = Math.ceil(total / limit);

        return {
            limit,
            page,
            totalRecords: data.length,
            totalPages,
            records: data,
            total
        };

    }

    async findByName(name: string): Promise<RolEntity | null> {
        return await this.rolRepositoryDB.findOneBy({ rol_Nombre: name });
    }

    async create(values: TCreateRol): Promise<RolEntity> {

        const rolNew = this.rolRepositoryDB.create(values);
        return await this.rolRepositoryDB.save(rolNew);

    }

    async findByCode(code: string): Promise<RolEntity | null> {

        return await this.rolRepositoryDB.findOneBy({ rol_Codigo: code });

    }

    async findById(id: number): Promise<RolEntity | null> {

        return await this.rolRepositoryDB.findOneBy({ rol_Id: id });

    }

    async update(id: number, values: TUpdateRol): Promise<RolEntity | null> {

        await this.rolRepositoryDB.update({ rol_Id: id }, {
            ...values
        });

        return await this.rolRepositoryDB.findOneBy({ rol_Id: id });

    }
}