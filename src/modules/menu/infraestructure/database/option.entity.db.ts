import { Entity , PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from "typeorm";

@Entity({ name: "opciones"})
export class OptionEntityDB {

    @PrimaryGeneratedColumn()
    opcion_Id!: number;

    @Column({ type: "int", nullable: false })
    opcion_SubmoduloId!: number;

    @Column({ type: "varchar", nullable: false })
    opcion_Nombre!: string;

    @Column({ type: "varchar", nullable: false })
    opcion_Ruta!: string;

    @Column({ type: "int", nullable: false })
    opcion_Orden!: number;

    @Column({ type: "varchar", nullable: false })
    opcion_Codigo!: string;

    @Column({ type: "boolean", nullable: false , default: true })
    opcion_Activo!: boolean;

    @CreateDateColumn()
    opcion_Creacion!: Date;

    @UpdateDateColumn()
    opcion_Modificacion!: Date;

}