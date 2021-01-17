import { Router } from 'express';
import todoRouter from './todo';

const router = Router();

router.use(todoRouter);

export default router;