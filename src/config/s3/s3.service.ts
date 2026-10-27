
import {
    PutObjectCommand,
    GetObjectCommand,
    DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { s3Client } from "./s3.client.ts";
import { envConfig } from "../env/env.config.ts";
import { injectable } from "tsyringe";

const bucket = envConfig.s3Bucket!;

@injectable()
export class S3Service {

    uploadFile = async (

        key: string,
        file: Buffer,
        contentType: string

    ): Promise<void> => {

        await s3Client.send(
            new PutObjectCommand({
                Bucket: bucket,
                Key: key,
                Body: file,
                ContentType: contentType,
            })
        );
    };

    getFile = async (key: string) => {

        return s3Client.send(
            new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        );
    };

    deleteFile = async (key: string): Promise<void> => {

        await s3Client.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        );

    };

}
