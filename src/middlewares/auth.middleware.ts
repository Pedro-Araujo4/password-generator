import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../models/http-status.js';

const ADMIN_KEY = process.env.ADMIN_KEY;

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const userKey = req.headers['x-admin-key'];

  if (userKey !== ADMIN_KEY) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: 'error',
      message: 'Acesso negado: Chave de administrador inválida ou ausente.'
    });
  }

  // Se a chave estiver correta, permite prosseguir
  next();
};