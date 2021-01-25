import { Router } from 'express';
import * as todoController from '../controllers/todoController';
import session from '../middlewares/session';

const todoRouter = Router();

// todoRouter.use(session);

todoRouter
  .get('/users/:userId/todos', todoController.todoList)
  .get('/users/:userId/todos/:id', todoController.todoDetail)
  .post('/users/:userId/todos', todoController.createTodo)
  .patch('/users/:userId/todos/:id', todoController.updateTodo)
  .patch('/users/:userId/todos/:id/toggle-is-done', todoController.toggleIsDone)
  .delete('/users/:userId/todos/:id', todoController.deleteTodo);

export default todoRouter;