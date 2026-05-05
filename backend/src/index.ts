import type { Response, Request } from "express";
import type { Express } from "express";

import express from "express";

import config from "./config";

const APP: Express = express();
const PORT: number = config.port;

APP.use(express.json());

// Routes
APP.get("/", (req: Request, res: Response): void => {
  res.send("Server working!");
});

// Start server
if (require.main === module) {
  APP.listen(PORT, (): void => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

export default APP;