export class UserPermissionEntity {

    constructor(

        public peusua_Id: number | null,
        public peusua_OpcionId: number,
        public peusua_UsuarioId: number,
        public peusua_Crear: boolean,
        public peusua_Editar: boolean,
        public peusua_Activo: boolean = true,
        public peusua_CambiarStatus: boolean,
        public peusua_CreacionId: number,
        public peusua_ModificacionId: number,
        public peusua_Creacion: Date,
        public peusua_Modificacion: Date,
    ){}
}