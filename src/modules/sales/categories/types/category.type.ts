
export type TCategory = {

    cate_Nombre: string;
    cate_Codigo: string;

}

export type TCreateCategory = TCategory & {
    cate_CreacionId: number;
}

export type TUpdateCategory = TCategory & {
    cate_ModificacionId: number;
}