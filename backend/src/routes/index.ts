import { Router } from 'express';
import morgan from 'morgan';
import AuthRouter from './auth';
import userRouter from './user';
import todoRouter from './todo';

const router = Router();

router.use(morgan('dev'));

router.use(AuthRouter);
router.use(userRouter);
router.use(todoRouter);

export default router;