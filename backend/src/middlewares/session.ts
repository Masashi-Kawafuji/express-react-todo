import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

type Message = {
  message: string;
};

const session: RequestHandler<null, Message> = async (req, res, next) => {
  const { authToken } = req.signedCookies;
  try {
    const decoded = jwt.verify(authToken, process.env.HMAC_SECRET);
    const user = await User.findByPk(decoded['userId']);
    if (user) next();
    else new Error('The user does not exist.');
  } catch (err) {
    res.json({ message: err || 'You need to login.' }).status(401);
  }
}

export default session;