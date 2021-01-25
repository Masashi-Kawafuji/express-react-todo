import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const session = async (req: Request, res: Response, next: NextFunction) => {
  const { authToken } = req.signedCookies;
  try {
    const decoded = jwt.verify(authToken, process.env.HMAC_SECRET);
    const user = await User.findByPk(decoded.userId);
    if (user) next();
    else res.json({ message: 'You need to login.' }).status(401);
  } catch (err) {
    res.json({ message: 'You need to login.' }).status(401);
  }
}

export default session;