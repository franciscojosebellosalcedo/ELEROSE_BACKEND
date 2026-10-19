import { MigrationInterface, QueryRunner } from "typeorm";

export class Tablas1792454204230 implements MigrationInterface {
    name = 'Tablas1792454204230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`usua_Id\` int NOT NULL AUTO_INCREMENT, \`usua_Nombre\` varchar(255) NOT NULL, \`usua_NombreUsuario\` varchar(255) NOT NULL, \`usua_Contrasenia\` varchar(255) NOT NULL, \`usua_Codigo\` varchar(255) NOT NULL DEFAULT '', \`usua_Activo\` tinyint NOT NULL DEFAULT 1, \`usua_RolId\` int NOT NULL, \`usua_CreacionId\` int NOT NULL, \`usua_ModificacionId\` int NOT NULL DEFAULT '0', \`usua_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`usua_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`usua_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`modulos\` (\`modulo_Id\` int NOT NULL AUTO_INCREMENT, \`modulo_Nombre\` varchar(255) NOT NULL, \`modulo_Icono\` varchar(255) NOT NULL, \`modulo_Orden\` int NOT NULL, \`modulo_Activo\` tinyint NOT NULL DEFAULT 1, \`modulo_Codigo\` varchar(255) NOT NULL, \`modulo_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`modulo_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`modulo_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`opciones\` (\`opcion_Id\` int NOT NULL AUTO_INCREMENT, \`opcion_SubmoduloId\` int NOT NULL, \`opcion_Nombre\` varchar(255) NOT NULL, \`opcion_Ruta\` varchar(255) NOT NULL, \`opcion_Orden\` int NOT NULL, \`opcion_Codigo\` varchar(255) NOT NULL, \`opcion_Activo\` tinyint NOT NULL DEFAULT 1, \`opcion_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`opcion_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`opcion_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`rol_Id\` int NOT NULL AUTO_INCREMENT, \`rol_Nombre\` varchar(255) NOT NULL, \`rol_Descripcion\` varchar(255) NOT NULL, \`rol_Codigo\` varchar(255) NOT NULL DEFAULT '', \`rol_Activo\` tinyint NOT NULL DEFAULT 1, \`rol_CreacionId\` int NOT NULL, \`rol_ModificacionId\` int NOT NULL DEFAULT '0', \`rol_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`rol_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`rol_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rol_permisos\` (\`perol_Id\` int NOT NULL AUTO_INCREMENT, \`perol_RolId\` int NOT NULL, \`perol_OpcionId\` int NOT NULL, \`perol_Crear\` tinyint NOT NULL DEFAULT 0, \`perol_Editar\` tinyint NOT NULL DEFAULT 0, \`perol_CambiarStatus\` tinyint NOT NULL DEFAULT 0, \`perol_Activo\` tinyint NOT NULL DEFAULT 1, \`perol_CreacionId\` int NOT NULL, \`perol_ModificacionId\` int NOT NULL DEFAULT '0', \`perol_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`perol_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`perol_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`submodulos\` (\`submo_Id\` int NOT NULL AUTO_INCREMENT, \`submo_Nombre\` varchar(255) NOT NULL, \`submo_Activo\` tinyint NOT NULL DEFAULT 1, \`submo_ModuloId\` int NOT NULL, \`submo_Orden\` int NOT NULL, \`submo_Codigo\` varchar(255) NOT NULL DEFAULT '', \`submo_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`submo_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`submo_Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario_permisos\` (\`peusua_Id\` int NOT NULL AUTO_INCREMENT, \`peusua_UsuarioId\` int NOT NULL, \`peusua_OpcionId\` int NOT NULL, \`peusua_Crear\` tinyint NOT NULL DEFAULT 0, \`peusua_Editar\` tinyint NOT NULL DEFAULT 0, \`peusua_CambiarStatus\` tinyint NOT NULL DEFAULT 0, \`peusua_Activo\` tinyint NOT NULL DEFAULT 1, \`peusua_CreacionId\` int NOT NULL, \`peusua_ModificacionId\` int NOT NULL DEFAULT '0', \`peusua_Creacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`peusua_Modificacion\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`peusua_Id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`usuario_permisos\``);
        await queryRunner.query(`DROP TABLE \`submodulos\``);
        await queryRunner.query(`DROP TABLE \`rol_permisos\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`opciones\``);
        await queryRunner.query(`DROP TABLE \`modulos\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
