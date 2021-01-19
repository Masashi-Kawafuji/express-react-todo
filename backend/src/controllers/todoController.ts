import { Request, Response} from 'express';
import Todo from '../models/todo';
import { getIdFromRequest } from '../helpers/controller-helper';

type ResponseMessage = {
  message: string;
};

const getTodoById: (req: Request) => Promise<Todo> = req => {
  return Todo.findByPk(getIdFromRequest(req));
}

export const todoList = async (req: Request, res: Response<Todo[]>) => {
  const todos = await Todo.findAll();
  res.json(todos);
}

export const todoDetail = async (req: Request, res: Response<Todo>) => {
  const todo = await getTodoById(req);
  res.json(todo);
}

export const createTodo = (req: Request, res: Response<Todo>) => {
  const attributes = req.body;
  const todo = Todo.build(attributes);
  todo.save()
    .then(todo => res.json(todo).status(201))
    .catch(err => res.json(err).status(422));
}

export const updateTodo = async (req: Request, res: Response<Todo>) => {
  const attributes = req.body;
  const todo = await getTodoById(req);
  todo.update(attributes)
    .then(todo => res.json(todo))
    .catch(err => res.json(err).status(442));
}

export const toggleIsDone = async (req: Request, res: Response<ResponseMessage>) => {
  const todo = await getTodoById(req);
  await todo.update({ isDone: !todo.isDone })
  res.json({ message: 'The item got updated successfully.' });
}

export const deleteTodo = async (req: Request, res: Response<null | ResponseMessage>) => {
  const todo = await getTodoById(req);
  if (todo) {
    await todo.destroy();
    res.status(204).end();
  } else {
    res.json({ message: `The todo doesn't exsit.` }).status(404);
  }
}