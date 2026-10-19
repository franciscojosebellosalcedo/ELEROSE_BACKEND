import "./shared/container.ts";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { appConfig } from "./config/app.config.ts";
import routesPublic from "./routes/routes.public.ts";
import routesPrivate from "./routes/routes.private.ts";
import { errorMiddleware } from "./middleware/error.middleware.ts";
import { authMiddleware } from "./middleware/auth.middleware.ts";
import cors from "cors";
import { envConfig } from "./config/env/env.config.ts";
import { normalizeBody } from "./middleware/normalize.body.middleware.ts";

const app = express();

app.use( helmet() );

app.use( morgan("dev") );

app.use( cors({
    origin: envConfig.appCorsOrigin 
}) );

app.use(express.json({
    limit: "10mb"
}));

app.use( normalizeBody )

app.use( appConfig.prefix , routesPublic );

app.use( authMiddleware );

app.use( appConfig.prefix , routesPrivate );

app.use( errorMiddleware );

export default app;