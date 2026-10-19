import type { TCreateUserPermission, TUpdateUserPermission } from "../../types/user.type.ts";
import type { UserPermissionEntity } from "../entities/user.permission.entity.ts";

export abstract class UserPermissionRepository {

    abstract create( permissions: TCreateUserPermission[] ): Promise<UserPermissionEntity[]>;

    abstract update( idUser: number , permissions: TUpdateUserPermission[] , idCurrentUser: number ): Promise<UserPermissionEntity[]>;

    abstract findByIdUser( idUser: number ): Promise<UserPermissionEntity[]>;

}