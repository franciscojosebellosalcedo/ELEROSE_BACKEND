import type { TPagination } from "../../../../../shared/types/pagination.type.ts";
import type { TCreateUser, TUpdateUser } from "../../types/user.type.ts";
import type { UserEntity } from "../entities/user.entity.ts";

export abstract class UserRepository {

    abstract paginate( page: number , limit: number ): Promise<TPagination<UserEntity>>

    abstract create( values: TCreateUser ): Promise<UserEntity>;

    abstract update( id: number, values: TUpdateUser ): Promise<UserEntity | null>;

    abstract search( name: string ): Promise<UserEntity[]>;

    abstract disable( id: number, idCurrentUser: number ): Promise<UserEntity | null>;

    abstract enable( id: number , idCurrentUser: number): Promise<UserEntity | null>;

    abstract findByNameUser( nameUser: string ): Promise<UserEntity | null>;

    abstract findByNameExludeId( nameUser: string, idExlude: number ): Promise<UserEntity | null>;

    abstract findById( id: number ): Promise<UserEntity | null>;

}