import type { TSubmoduleMenu } from "../../types/menu.type.ts";

export abstract class SubmoduleRepository {

    abstract create( options: TSubmoduleMenu[] ): Promise<void>;

}