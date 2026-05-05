import type { Response, Request } from "express";
import type { Express } from "express";

import express from "express";

import config from "./config";

// Middlewares
import errorHandler from "./middlewares/errorHandler.middleware";

// Routes
import routerV1 from "./api/v1/v1.router";

const APP: Express = express();
const PORT: number = config.port;

APP.use(express.json());

// Routes
APP.get("/", (req: Request, res: Response): void => {
  res.send("Server working!");
});
APP.use('/v1', routerV1);

// Error handling middleware
APP.use(errorHandler);

// Start server
if (require.main === module) {
  APP.listen(PORT, (): void => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default APP;