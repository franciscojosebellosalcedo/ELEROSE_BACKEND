import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "submodulos" })
export class SubmoduleEntityDB {

    @PrimaryGeneratedColumn()
    submo_Id!: number;

    @Column({ type: "varchar", nullable: false })
    submo_Nombre!: string;

    @Column({ type: "boolean", nullable: false , default: true })
    submo_Activo!: boolean;

    @Column({ type: "int", nullable: false })
    submo_ModuloId!: number;

    @Column({ type: "int", nullable: false })
    submo_Orden!: number;

    @Column({ type: "varchar", nullable: false , default: "" })
    submo_Codigo!: string;

    @CreateDateColumn()
    submo_Creacion!: Date;

    @UpdateDateColumn()
    submo_Modificacion!: Date;
}