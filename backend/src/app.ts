import type { Response, Request } from "express";
import type { Express } from "express";

import express from "express";

// Middlewares
import errorHandler from "./middlewares/errorHandler.middleware";

// Routes
import routerV1 from "./api/v1/v1.router";

const app: Express = express();

app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response): void => {
  res.send("Server working!");
});
app.use('/v1', routerV1);

// Error handling middleware
app.use(errorHandler);

export default app;
