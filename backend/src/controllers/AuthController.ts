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
  
  try {
    if (user.password === password) {
      // generate a token.
      const token = jwt.sign({ userId: user.id }, process.env.HMAC_SECRET);
      res.json(user).cookie('authToken', token, {
        httpOnly: true,
        signed: true
      });
    } else {
      res.json(errorMessage).status(401);
    }
  } catch {
    res.json(errorMessage).status(401);
  }
}