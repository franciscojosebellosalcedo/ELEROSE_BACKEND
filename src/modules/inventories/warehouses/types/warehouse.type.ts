export type TDataWarehouse = {
    alm_Nombre: string;
}

export type TCreateWarehouse = TDataWarehouse & {
    alm_CreacionId: number
}

export type TUpdateWarehouse = TDataWarehouse & {
    alm_ModificacionId: number
}