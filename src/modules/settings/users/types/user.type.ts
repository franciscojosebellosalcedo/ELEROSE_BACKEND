export type TDataUser = {
    usua_Nombre: string,
    usua_NombreUsuario: string,
    usua_Contrasenia: string,
    usua_RolId: number
}

export type TDataUserPermission = {
    peusua_OpcionId: number;
    peusua_Crear: boolean;
    peusua_Editar: boolean;
    peusua_CambiarStatus: boolean;
}

export type TCreateUserPermission = TDataUserPermission & {
    peusua_UsuarioId: number;
    peusua_CreacionId: number;
}

export type TUpdateUserPermission = TDataUserPermission & {
    peusua_ModificacionId: number;
}

export type TCreateUser = TDataUser & {
    usua_CreacionId: number
}

export type TUpdateUser = TDataUser & {
    usua_ModificacionId: number
}

export type TDataCreateUser = {

    user: TDataUser;
    permissions: TDataUserPermission[]

}
