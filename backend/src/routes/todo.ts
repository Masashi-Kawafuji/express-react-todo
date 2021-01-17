import { Router } from 'express';
import * as todoController from '../controllers/todoController';

const todoRouter = Router();

todoRouter.get('/todos', todoController.todoList);

export default todoRouter;