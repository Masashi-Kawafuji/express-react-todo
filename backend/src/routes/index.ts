import { Router } from 'express';
import todoRouter from './todo';
import userRouter from './user';

const router = Router();

router.use(todoRouter);
router.use(userRouter);

export default router;