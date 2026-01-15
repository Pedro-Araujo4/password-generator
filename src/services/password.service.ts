import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../../generated/prisma/client.js";
import { IPasswordOptions, IPasswordRecord } from '../models/password-model.js';
import { generatePassword } from '../utils/password-generator.js';
import { formatDateReadable } from '../utils/date-helper.js';
import { logger } from './logger.service.js';

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };

export class PasswordService {
 public async execute(options: IPasswordOptions): Promise<any> { 
  try {
    // 1. Gera a senha puramente em memória
    const password = generatePassword(options.length, options.hasSymbols, options.noDuplicates);

    // 2. Tenta salvar (O erro acontece aqui se a URL estiver undefined)
    const saved = await prisma.password.create({
      data: {
        content: password,
        length: options.length,
        hasSymbols: options.hasSymbols,
        noDuplicates: options.noDuplicates,
      }
    });
       await logger.log('GENERATE_PASSWORD', `Size: ${saved.length}, ID: ${saved.id}`);
    // 3. Retorno simplificado para teste (Sem helpers ou mappers complexos)
    return {
      id: saved.id,
      content: saved.content,
      status: "Sucesso no Banco!"
    };
  } catch (error: any) {
    console.error("ERRO DENTRO DO SERVICE:", error);
    throw new Error(`Falha no Prisma: ${error.message}`);
  }
}

  public async findById(id: string): Promise<IPasswordRecord | null> {
    const saved = await prisma.password.findUnique({
      where: { id }
    });

    if (!saved) return null;

    return {
      id: saved.id,
      password: saved.content,
      length: saved.length,
      createdAt: saved.createdAt.toISOString(),
      formattedDate: formatDateReadable(saved.createdAt)
    };
  }

  public async listAll(): Promise<IPasswordRecord[]> {
    const passwords = await prisma.password.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return passwords.map(p => ({
      id: p.id,
      password: p.content,
      length: p.length,
      createdAt: p.createdAt.toISOString(),
      formattedDate: formatDateReadable(p.createdAt)
    }));
  }

  public async remove(id?: string): Promise<void> {
    if (id) {
      await prisma.password.delete({ where: { id } });
    } else {
      await prisma.password.deleteMany();
    }

    const detail = id ? `ID: ${id}` : 'ALL PASSWORDS';
    await logger.log('DELETE_PASSWORD', detail);
  }
}