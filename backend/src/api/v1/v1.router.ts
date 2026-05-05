import express from 'express';
import dutiesRouter from './duties/duties.router';

const router = express.Router();

// Routes
router.use('/duties', dutiesRouter);

export default router