import type { TOptionMenu } from "../../types/menu.type.ts";
import type { OptionEntity } from "../entities/option.entity.ts";

export abstract class OptionRepository {

    abstract findOptionsBySubmoduleId( idSubmodule: number ): Promise<OptionEntity[]>;

    abstract findOptionByCode( code: string ): Promise<OptionEntity | null>;

    abstract find( ): Promise<OptionEntity[]>;

    abstract findOptionById( id: number): Promise<OptionEntity | null>;

    abstract createOptions( options: TOptionMenu[] ): Promise<void>;

}