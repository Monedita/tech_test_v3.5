import type { Request, Response } from 'express';
import type Duty from './duties.interface';
import { createOrUpdateDutySchema, getDutySchema } from './duties.schema';
import express from 'express';
import joiSchemaValidator from '../../../middlewares/joiSchemaValidator.middleware';
import dutiesServices from './duties.services';

const router = express.Router();

router.get('/',
  async (req: Request, res: Response) => {
    const duties = await dutiesServices.getAllDuties();
    return res.json(duties);
  }
);

router.get('/:id',
  joiSchemaValidator(getDutySchema, 'params'),
  async (req: Request, res: Response) => {
    const duty = await dutiesServices.getDutyById(req.params.id as Duty['id']);
    if (!duty) {
      return res.status(404).json({ error: 'Duty not found' });
    }
    return res.status(200).json(duty);
  }
);

router.post('/',
  joiSchemaValidator(createOrUpdateDutySchema, 'body'),
  async (req: Request, res: Response) => {
    const duty: Duty = await dutiesServices.createDuty(req.body as Omit<Duty, 'id'>);
    return res.status(201).json(duty);
  }
);

// Complete Replace - Not required by the exercise.
/*
router.put('/:id',
  async (req: Request, res: Response) => {
    res.send("Server working!");
  }
);
*/

// Update - Partial Replace
router.patch('/:id',
  joiSchemaValidator(getDutySchema, 'params'),
  joiSchemaValidator(createOrUpdateDutySchema, 'body'),
  async (req: Request, res: Response) => {
    const duty = await dutiesServices.updateDuty(req.params.id as Duty['id'], req.body as Partial<Omit<Duty, 'id'>>);
    if (!duty) {
      return res.status(404).json({ error: 'Duty not found' });
    }
    return res.status(200).json(duty);
  }
);

router.delete('/:id',
  joiSchemaValidator(getDutySchema, 'params'), async (req: Request, res: Response) => {
    const result = await dutiesServices.deleteDuty(req.params.id as Duty['id']);
    return res.status(204).json({ message: 'Duty deleted successfully' });
  }
);

export default router;