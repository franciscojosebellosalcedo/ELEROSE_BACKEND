
export class OptionEntity {

    constructor(
        public opcion_Id: number | null,
        public opcion_Nombre: string,
        public opcion_Ruta: string,
        public opcion_Codigo: string,
        public opcion_Activo: boolean = true,
        public opcion_SubmoduloId: number,
        public opcion_Creacion: Date,
        public opcion_Modificacion: Date,

    ){}
}