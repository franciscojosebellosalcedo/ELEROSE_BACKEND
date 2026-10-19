import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "usuario_permisos"})
export class UserPermissionEntityDB {

    @PrimaryGeneratedColumn()
    peusua_Id!: number;

    @Column({ type: "int", nullable: false })
    peusua_UsuarioId!: number;

    @Column({ type: "int", nullable: false })
    peusua_OpcionId!: number;

    @Column({ type: "boolean", nullable: false, default: false })
    peusua_Crear!: boolean;

    @Column({ type: "boolean", nullable: false, default: false })
    peusua_Editar!: boolean;

    @Column({ type: "boolean", nullable: false, default: false })
    peusua_CambiarStatus!: boolean;

    @Column({ type: "boolean", nullable: false, default: true })
    peusua_Activo!: boolean;

    @Column({ type: "int", nullable: false })
    peusua_CreacionId!: number;

    @Column({ type: "int", nullable: false , default: 0 })
    peusua_ModificacionId!: number;

    @CreateDateColumn()
    peusua_Creacion!: Date;

    @UpdateDateColumn()
    peusua_Modificacion!: Date;

}