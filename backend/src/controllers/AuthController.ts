import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

type Message = {
  message: string;
};

type LoginRequestBody = {
  email: string;
  password: string;
};

export const login: RequestHandler<null , User | Message, LoginRequestBody> = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  const errorMessage: Message = {
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

export const logout: RequestHandler = (req, res) => {
  res.clearCookie('authToken').status(204).end();
}