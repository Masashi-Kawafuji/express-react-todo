import { RequestHandler } from 'express';
import User from '../models/user';

export const createUser: RequestHandler<null, User> = (req, res) => {
  const attributes = req.body;
  const user = User.build(attributes);
  user.save()
    .then(user => res.json(user).status(201))
    .catch(err => res.json(err).status(422));
}