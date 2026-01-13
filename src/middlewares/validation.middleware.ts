import { Request, Response, NextFunction } from 'express';
import { validatePasswordLength } from '../models/password-model.js';
import { HttpStatus } from '../models/http-status.js';

export const validatePasswordRequest = (req: Request, res: Response, next: NextFunction) => {
  const { length } = req.query;
  const passwordLength = Number(length) || 12;

  const validation = validatePasswordLength(passwordLength);

  if (!validation.isValid) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: 'error',
      message: validation.error
    });
  }

  // Se estiver tudo OK, o "next()" permite que a requisição siga para o Controller
  next();
};