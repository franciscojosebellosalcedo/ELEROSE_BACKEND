export class UserEntity {

    constructor(
        public usua_Id: number | null,
        public usua_Nombre: string,
        public usua_NombreUsuario: string,
        public usua_Contrasenia: string,
        public usua_Codigo: string,
        public usua_Activo: boolean = true,
        public usua_RolId: number,
        public usua_CreacionId: number,
        public usua_ModificacionId: number,
        public usua_Creacion: Date,
        public usua_Modificacion: Date
    ){

    }

}