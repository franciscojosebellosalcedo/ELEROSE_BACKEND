
export class WarehouseEntity {

    constructor(
        public alm_Id: number | null,
        public alm_Nombre: string,
        public alm_Activo: boolean = true,
        public alm_CreacionId: number,
        public alm_ModificacionId: number,
        public alm_Creacion: Date,
        public alm_Modificacion: Date
    ){};
    
};