import { Request, Response } from 'express';
import { PasswordService } from '../services/password.service.js';
import { IPasswordResponse, IErrorResponse } from '../models/password-model.js';
import { HttpStatus } from '../models/http-status.js';
import { parsePasswordQuery } from '../utils/request-helper.js';

const passwordService = new PasswordService();

export class PasswordController {
  public handle = async (req: Request, res: Response<IPasswordResponse | IErrorResponse>) => {
    try {
      // 1. O Mapper cuida da tradução dos dados
      const options = parsePasswordQuery(req.query);

      // 2. O Service executa a lógica
      const passwordRecord = await passwordService.execute(options);

      // 3. O método privado organiza a resposta
      return res.status(HttpStatus.OK).json(passwordRecord);

    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: error.message
      });
    }
  };
  // GET /passwords/:id
  public getById = async (req: Request, res: Response) => {
    try {
      const id = String(req.params.id); // Forçamos a conversão para string pura para o TypeScript não reclamar
      const password = await passwordService.findById(id);

      if (!password) {
        return res.status(HttpStatus.NOT_FOUND).json({ 
          status: 'error', 
          message: 'Senha não encontrada.' 
        });
      }

      return res.status(HttpStatus.OK).json(password);
    } catch (error: any) {
      return res.status(HttpStatus.INTERNAL_ERROR).json({ status: 'error', message: error.message });
    }
  };

  // GET /passwords (Lista todas)
  public getAll = async (_req: Request, res: Response) => {
    const passwords = await passwordService.listAll();
    return res.status(HttpStatus.OK).json(passwords);
  };

  // DELETE /passwords/:id ou DELETE /passwords
  public delete = async (req: Request, res: Response) => {
   try {
    // Verificamos se o ID realmente existe nos parâmetros
    const idParam = req.params.id;
    
    // Se existir, convertemos para String. Se não, deixamos undefined.
    const id = idParam ? String(idParam) : undefined;

    await passwordService.remove(id);

    return res.status(HttpStatus.OK).json({
      status: 'success',
      message: id ? `Senha com ID ${id} removida.` : 'Todas as senhas foram removidas com sucesso.'
    });
  } catch (error: any) {
    return res.status(HttpStatus.INTERNAL_ERROR).json({ 
      status: 'error', 
      message: error.message 
    });
  };
 };
};