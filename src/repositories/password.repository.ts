import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { IPasswordRecord } from '../models/password.model.js';

// __dirname não existe por padrão. Ela só existe no sistema antigo (CommonJS), então emulamos o __dirname usando o módulo url
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.resolve(__dirname, '../../data/passwords.json');


export class PasswordRepository {
  
  public async getAll(): Promise<IPasswordRecord[]> {
    try {
      // Garante que a pasta existe antes de ler/escrever
      const directory = path.dirname(filePath);
      await fs.mkdir(directory, { recursive: true });
      
      // Busca todas as senhas
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return []; // Se o arquivo não existir, retorna lista vazia
    }
  }

  // Salva uma nova senha
  public async save(record: IPasswordRecord): Promise<void> {
    const passwords = await this.getAll();
    passwords.push(record);
    await fs.writeFile(filePath, JSON.stringify(passwords, null, 2));
  }

  // Busca por ID
  public async findById(id: string): Promise<IPasswordRecord | undefined> {
    const passwords = await this.getAll();
    return passwords.find(p => p.id === id);
  }

  // Deleta por ID ou todas
  public async delete(id?: string): Promise<void> {
    if (!id) {
      await fs.writeFile(filePath, JSON.stringify([]));
      return;
    }
    const passwords = await this.getAll();
    const filtered = passwords.filter(p => p.id !== id);
    await fs.writeFile(filePath, JSON.stringify(filtered, null, 2));
  }

};