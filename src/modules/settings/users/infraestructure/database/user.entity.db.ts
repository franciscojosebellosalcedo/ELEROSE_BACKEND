import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "usuarios"})
export class UserEntityDB {

    @PrimaryGeneratedColumn()
    usua_Id!: number;

    @Column({ type: "varchar", nullable: false })
    usua_Nombre!: string;

    @Column({ type: "varchar", nullable: false })
    usua_NombreUsuario!: string;

    @Column({ type: "varchar", nullable: false })
    usua_Contrasenia!: string;

    @Column({ type: "varchar", nullable: false , default: ""})
    usua_Codigo!: string;

    @Column({ type: "boolean", nullable: false, default: true })
    usua_Activo!: boolean;

    @Column({ type: "int", nullable: false })
    usua_RolId!: number;

    @Column({type: "boolean", nullable: false , default: true })

    @Column({ type: "int", nullable: false })
    usua_CreacionId!: number;

    @Column({ type: "int", nullable: false , default: 0 })
    usua_ModificacionId!: number;

    @CreateDateColumn()
    usua_Creacion!: Date;

    @UpdateDateColumn()
    usua_Modificacion!: Date;

}