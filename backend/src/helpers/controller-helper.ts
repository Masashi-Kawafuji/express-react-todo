import { Request } from 'express';

export const getIdFromRequest: (req: Request) => string = req => {
  const { id } = req.params;
  return id;
}