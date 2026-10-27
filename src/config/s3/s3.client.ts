
import { S3Client } from "@aws-sdk/client-s3";
import { envConfig } from "../env/env.config.ts";

const {
    s3Endpoint,
    s3Region,
    s3AccessKey,
    s3SecretKey
} = envConfig;

export const s3Client = new S3Client({
    endpoint: s3Endpoint,
    region: s3Region,
    credentials: {
        accessKeyId: s3AccessKey!,
        secretAccessKey: s3SecretKey!,
    },
    forcePathStyle: true,
    requestHandler: undefined,
});
