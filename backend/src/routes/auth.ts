import { Router } from 'express';
import * as AuthController from '../controllers/AuthController';

const AuthRouter = Router();

AuthRouter
  .post('/login', AuthController.login)
  .post('/logout', AuthController.logout);
  
export default AuthRouter;