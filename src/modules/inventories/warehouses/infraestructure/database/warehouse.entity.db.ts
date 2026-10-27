import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "almacenes" })
export class WarehouseEntityDB {

    @PrimaryGeneratedColumn()
    alm_Id!: number;

    @Column({ type: "varchar", nullable: false })
    alm_Nombre!: string;

    @Column({ type: "boolean", nullable: false, default: true })
    alm_Activo!: boolean;

    @Column({ type: "int", nullable: false })
    alm_CreacionId!: number;

    @Column({ type: "int", nullable: false , default: 0 })
    alm_ModificacionId!: number;

    @CreateDateColumn()
    alm_Creacion!: Date;

    @UpdateDateColumn()
    alm_Modificacion!: Date;
    
}