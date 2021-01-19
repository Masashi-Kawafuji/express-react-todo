import { Router } from 'express';
import * as todoController from '../controllers/todoController';

const todoRouter = Router();

todoRouter
  .get('/todos', todoController.todoList)
  .get('/todos/:id', todoController.todoDetail)
  .post('/todos', todoController.createTodo)
  .patch('/todos/:id', todoController.updateTodo)
  .patch('/todos/:id/toggle-is-done', todoController.toggleIsDone)
  .delete('/todos/:id', todoController.deleteTodo);

export default todoRouter;