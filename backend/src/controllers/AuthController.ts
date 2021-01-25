import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

type Message = {
  message: string;
};

export const login = async (req: Request, res: Response<User | Message>) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  const errorMessage = {
    message: 'The user does not exist or the password is incorrect.'
  };

  if (user && user.authenticate(password)) {
    const authToken = jwt.sign({ userId: user.id }, process.env.HMAC_SECRET);
    res.cookie('authToken', authToken, {
      httpOnly: true,
      signed: true
    }).json(user);
  } else {
    res.json(errorMessage).status(401);
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('authToken').status(204).end();
}