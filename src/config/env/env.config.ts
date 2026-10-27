import dotenv from "dotenv";
import path from "node:path";

const environment = process.env.NODE_ENV ?? "dev";

dotenv.config({
    path: [
        path.resolve(
            process.cwd(),
            `.env.${environment}`
        )
    ]
});

const getValue = ( key: string ) =>{

    const value = process.env[key];

    if( !value && ["dev" , "prod"].includes(environment) ){
        throw new Error(`Key env ${key} is required`);
    }

    return value;
}

export const envConfig = {

    nodeEnv: environment,

    appName: getValue("APP_NAME"),
    appCorsOrigin: getValue("APP_CORS_ORIGIN"),
    appPort: Number( getValue("APP_PORT") ),

    jwtSecretAccessToken: getValue("JWT_SECRET_ACCESS_TOKEN"),
    jwtSecretRefressToken: getValue("JWT_SECRET_REFRESS_TOKEN"),
    
    dbName: getValue("DB_NAME"),
    dbPort: Number( getValue("DB_PORT") ),
    dbHost: getValue("DB_HOST"),
    dbUser: getValue("DB_USER"),
    dbPassword: getValue("DB_PASSWORD"),

    s3Bucket: getValue("S3_BUCKET"),
    s3AccessKey: getValue("S3_ACCESS_KEY_ID"),
    s3SecretKey: getValue("S3_SECRET_ACCESS_KEY"),
    s3Endpoint: getValue("S3_ENDPOINT"),
    s3Region: getValue("S3_REGION"),
    s3Certificate: getValue("NODE_EXTRA_CA_CERTS"),
}