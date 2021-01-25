import { Router } from 'express';
import morgan from 'morgan';
import todoRouter from './todo';
import userRouter from './user';

const router = Router();

router.use(morgan('dev'));

router.use(todoRouter);
router.use(userRouter);

export default router;