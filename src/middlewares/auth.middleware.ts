import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../models/http-status.js';

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const userKey = req.headers['x-admin-key'];
  const ADMIN_KEY = process.env.ADMIN_KEY;

  if (!ADMIN_KEY) {
    return res.status(500).json({ 
      error: "Erro de configuração: Chave mestra não definida no servidor." 
    });
  }

  if (userKey !== ADMIN_KEY) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: 'error',
      message: 'Acesso negado: Chave de administrador inválida ou ausente.'
    });
  }

  // Se a chave estiver correta, permite prosseguir
  next();
};