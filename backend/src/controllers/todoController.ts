import { RequestHandler, Request } from 'express';
import Todo from '../models/todo';
import User from '../models/user';
import { getIdFromRequest } from '../helpers/controller-helper';

type ResponseMessage = {
  message: string;
};

type TodoRequestParams = {
  userId: string;
  id: string;
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
export const todoList: RequestHandler<TodoRequestParams, Todo[]> = async (req, res) => {
  const user = await getUserByUserId(req);
  user.getTodos()
    .then(todos => res.json(todos))
    .catch(err => res.json(err).status(404));
}

export const todoDetail: RequestHandler<TodoRequestParams, Todo | ResponseMessage> = async (req, res) => {
  const todo = await getTodoById(req);
  if (todo) res.json(todo);
  else res.json({ message: 'The item is not Found.' }).status(404);
}

export const createTodo: RequestHandler<TodoRequestParams, Todo | ResponseMessage> = async (req, res) => {
  const user = await getUserByUserId(req);
  const attributes = req.body;
  user.createTodo(attributes)
    .then(todo => res.json(todo).status(201))
    .catch(err => res.json(err).status(422));
}

export const updateTodo: RequestHandler<TodoRequestParams, Todo | ResponseMessage> = async (req, res) => {
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

export const toggleIsDone: RequestHandler<TodoRequestParams, Todo | ResponseMessage> = async (req, res) => {
  const todo = await getTodoById(req);
  if (todo) {
    await todo.update({ isDone: !todo.isDone });
    res.json({ message: 'The item got updated successfully.' }).status(204);
  } else {
    res.json({ message: 'The item is not Found.' }).status(404);
  }
}

export const deleteTodo: RequestHandler<TodoRequestParams, null | ResponseMessage> = async (req, res) => {
  const todo = await getTodoById(req);
  if (todo) {
    await todo.destroy();
    res.status(204).end();
  } else {
    res.json({ message: 'The item is not Found.' }).status(404);
  }
}