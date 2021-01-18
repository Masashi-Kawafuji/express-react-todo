import { Router } from 'express';
import * as todoController from '../controllers/todoController';

const todoRouter = Router();

todoRouter
  .get('/todos', todoController.todoList)
  .get('/todos/:id', todoController.todoDetail)
  .post('/todos', todoController.createTodo);

export default todoRouter;