import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { HttpStatus } from '../models/http-status.js';

// Instanciamos o service que lida com a lógica de bcrypt e JWT
const authService = new AuthService();

export class AuthController {
  // Rota para criar sua senha mestre inicial
  public signup = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      if (!password) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: "Senha é obrigatória" });
      }
      
      await authService.signup(password);
      return res.status(HttpStatus.OK).json({ message: "Usuário mestre criado com sucesso!" });
    } catch (error: any) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
    }
  };

  // Rota de login que devolve o Token JWT
  public login = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const token = await authService.login(password);
      
      // Retornamos o token para o cliente guardar
      return res.status(HttpStatus.OK).json({ token });
    } catch (error: any) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ error: error.message });
    }
  };
}