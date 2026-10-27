import { container } from "tsyringe";
import { S3_TOKENS } from "./s3.container.tokens.ts";
import { S3Service } from "../s3.service.ts";

container.register(
    S3_TOKENS.SERVICE,
    {
        useClass: S3Service
    }
);