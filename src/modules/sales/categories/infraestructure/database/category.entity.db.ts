import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "categorias" })
export class CategoryEntityDB {

    @PrimaryGeneratedColumn()
    cate_Id!: number;

    @Column({ type: "varchar", nullable: false })
    cate_Nombre!: string;

    @Column({ type: "varchar", nullable: false , default: "" })
    cate_Codigo!: string;

    @Column({ type: "boolean", nullable: false , default: true })
    cate_Activo!: boolean;

    @Column({ type: "int", nullable: false })
    cate_CreacionId!: number;

    @Column({ type: "int", nullable: false, default: 0 })
    cate_ModificacionId!: number;

    @CreateDateColumn()
    cate_Creacion!: Date;

    @UpdateDateColumn()
    cate_Modificacion!: Date;
    
}