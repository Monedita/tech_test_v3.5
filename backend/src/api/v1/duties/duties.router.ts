import type { Request, Response } from 'express';
//import type Duty from './duties.interface';
import express from 'express';

const router = express.Router();


router.get('/',
  async (req: Request, res: Response) => {
    res.send("duties!");
  }
);

export default router;