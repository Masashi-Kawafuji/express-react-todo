import { Request, Response} from 'express';
import Todo from '../models/todo';

export const todoList = async (req: Request, res: Response) => {
  const todos = await Todo.findAll();
  res.json(todos);
}