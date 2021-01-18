import { Request, Response} from 'express';
import Todo from '../models/todo';

export const todoList = async (req: Request, res: Response) => {
  const todos = await Todo.findAll();
  res.json(todos);
}

export const todoDetail = async (req: Request, res: Response) => {
  const { id } = req.params;
  const todo = await Todo.findByPk(parseInt(id));
  res.json(todo);
}

export const createTodo = (req: Request, res: Response) => {
  const attributes = req.body;
  const todo = Todo.build(attributes);
  todo.save({ fields: ['body'] })
    .then(todo => res.json(todo).status(201))
    .catch(err => res.json(err.errors).status(422));
}