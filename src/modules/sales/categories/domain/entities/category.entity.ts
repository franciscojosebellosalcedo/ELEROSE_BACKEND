
export class CategoryEntity {

    constructor(

        public cate_Id: number | null,
        public cate_Nombre: string,
        public cate_Codigo: string,
        public cate_Activo: boolean = true,
        public cate_CreacionId: number,
        public cate_ModificacionId: number,
        public cate_Creacion: Date,
        public cate_Modificacion: Date

    ){}
}