import { Request, Response } from 'express';
import Todo from '../models/todo';
import User from '../models/user';
import { getIdFromRequest } from '../helpers/controller-helper';

type ResponseMessage = {
  message: string;
};

// helpers
const getUserByUserId: (req: Request) => Promise<User> = req => {
  const { userId } = req.params;
  return User.findByPk(userId);
}

const getTodoById: (req: Request) => Promise<Todo> = req => {
  return Todo.findByPk(getIdFromRequest(req));
}

// actions
export const todoList = async (req: Request, res: Response<Todo[] | ResponseMessage>) => {
  const user = await getUserByUserId(req);
  user.getTodos()
    .then(todos => res.json(todos))
    .catch(err => res.json(err).status(404));
}

export const todoDetail = async (req: Request, res: Response<Todo | ResponseMessage>) => {
  const todo = await getTodoById(req);
  if (todo) res.json(todo);
  else res.json({ message: 'The item is not Found.' }).status(404);
}

export const createTodo = async (req: Request, res: Response<Todo>) => {
  const user = await getUserByUserId(req);
  const attributes = req.body;
  user.createTodo(attributes)
    .then(todo => res.json(todo).status(201))
    .catch(err => res.json(err).status(422));
}

export const updateTodo = async (req: Request, res: Response<Todo | ResponseMessage>) => {
  const attributes = req.body;
  const todo = await getTodoById(req);
  if (todo) {
    todo.update(attributes)
      .then(todo => res.json(todo))
      .catch(err => res.json(err).status(442));
  } else {
    res.json({ message: 'The item is not Found.' }).status(404);
  }
}

export const toggleIsDone = async (req: Request, res: Response<ResponseMessage>) => {
  const todo = await getTodoById(req);
  if (todo) {
    await todo.update({ isDone: !todo.isDone });
    res.json({ message: 'The item got updated successfully.' }).status(204);
  } else {
    res.json({ message: 'The item is not Found.' }).status(404);
  }
}

export const deleteTodo = async (req: Request, res: Response<null | ResponseMessage>) => {
  const todo = await getTodoById(req);
  if (todo) {
    await todo.destroy();
    res.status(204).end();
  } else {
    res.json({ message: 'The item is not Found.' }).status(404);
  }
}