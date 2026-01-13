import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logPath = path.resolve(__dirname, '../../logs/access.log');

export class LoggerService {
  public async log(action: string, details: string) {
    const timestamp = new Date().toLocaleString('pt-BR');
    const logEntry = `[${timestamp}] ACTION: ${action} | DETAILS: ${details}\n`;

    try {
      // Garante que a pasta logs existe
      await fs.mkdir(path.dirname(logPath), { recursive: true });
      
      // 'a' significa "append" (adicionar ao final do arquivo sem apagar o que já existe)
      await fs.appendFile(logPath, logEntry);
    } catch (error) {
      console.error('Falha ao gravar log:', error);
    }
  }
}

export const logger = new LoggerService();