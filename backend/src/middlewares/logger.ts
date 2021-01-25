import { Request, Response, NextFunction } from 'express';

type LoggerValues = Record<'req' | 'res', string[]>;

const parseRequest: (req: Request, key: string) => string = (req, key) => {
  return `${key.toUpperCase()}: ${typeof req[key] === 'object' ? JSON.stringify(req[key]) : req[key]}`;
}

const requestLog: (req: Request, object: LoggerValues) => string = (req, object) => {
  const messages: string[] = object.req.map(key => parseRequest(req, key));
  return messages.join('\n');
}

const logger = (object: LoggerValues) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(requestLog(req, object));
    next();
  }
}

export default logger;