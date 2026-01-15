import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from './password.service.js';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

  public async signup(passwordMestre: string) {
    // Transforma a senha em hash (não reversível)
    const hashedPassword = await bcrypt.hash(passwordMestre, 10);
    
      return await prisma.user.upsert({
          where: { username: 'admin' },
          update: { password: hashedPassword },
          create: {
              username: 'admin',
              password: hashedPassword
          }
      });
  }

  public async login(passwordMestre: string) {
    const user = await prisma.user.findUnique({ where: { username: 'admin' } });
    if (!user) throw new Error("Usuário não configurado.");

    // Compara a senha digitada com o hash do banco
    const isValid = await bcrypt.compare(passwordMestre, user.password);
    if (!isValid) throw new Error("Senha mestre incorreta.");

    // Gera um token que expira em 1 hora
    return jwt.sign({ id: user.id }, this.JWT_SECRET, { expiresIn: '1h' });
  }
}