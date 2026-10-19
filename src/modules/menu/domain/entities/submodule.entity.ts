export class SubmoduleEntity {

    constructor(
        public submo_Id: number | null,
        public submo_Nombre: string,
        public submo_Activo: boolean = true,
        public submo_ModuloId: number,
        public submo_Codigo: string,
        public submo_Creacion: Date,
        public submo_Modificacion: Date
    ){};

}