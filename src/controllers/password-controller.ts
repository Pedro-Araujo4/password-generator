import { Request, Response } from 'express';
import { PasswordService } from '../services/password.service.js';
import { IPasswordResponse, IErrorResponse } from '../models/password.model.js';
import { HttpStatus } from '../models/http-status.js';
import { formatDateReadable } from '../utils/date.helper.js';
import { parsePasswordQuery } from '../utils/request.helper.js';

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

  private mapSuccessResponse(password: string): IPasswordResponse {
    const now = new Date();
    return {
      password,
      length: password.length,
      createdAt: now.toISOString(),
      formattedDate: formatDateReadable(now)
    };
  }
}