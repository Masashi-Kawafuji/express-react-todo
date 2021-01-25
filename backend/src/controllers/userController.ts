import { Request, Response } from 'express';
import User from '../models/user';

export const createUser = (req: Request, res: Response<User>) => {
  const attributes = req.body;
  const user = User.build(attributes);
  user.save()
    .then(user => res.json(user).status(201))
    .catch(err => res.json(err).status(422));
}