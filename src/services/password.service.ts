import crypto from 'crypto';
import { IPasswordOptions, IPasswordRecord } from '../models/password.model.js';
import { generatePassword } from '../utils/password-generator.js';
import { PasswordRepository } from '../repositories/password.repository.js';
import { formatDateReadable } from '../utils/date.helper.js';
import { logger } from './logger.service.js';

// Instanciamos o repositório para uso do service
const repository = new PasswordRepository();

export class PasswordService {
  
  //Gera a senha, cria um registro com ID único e salva no "banco" JSON.
  public async execute(options: IPasswordOptions): Promise<IPasswordRecord> { 
    //  Gera a string da senha usando sua lógica utilitária
    const password = generatePassword(options.length, options.hasSymbols, options.noDuplicates);
    
    const now = new Date();

    // Monta o objeto completo (Record) que será salvo e retornado
    const newRecord: IPasswordRecord = {
      id: crypto.randomUUID(), // Gera um ID único como '550e8400-e29b-41d4-a716-446655440000'
      password,
      length: password.length,
      createdAt: now.toISOString(),
      formattedDate: formatDateReadable(now)
    };

    // Salva no arquivo JSON através do repositório
    await repository.save(newRecord);

    await logger.log('GENERATE_PASSWORD', `Size: ${newRecord.length}, ID: ${newRecord.id}`);

    return newRecord;
  };

  public async findById(id: string) {
    return await repository.findById(id);
  };

  public async listAll() {
    return await repository.getAll();
  };

  public async remove(id?: string) {
    await repository.delete(id);
    const detail = id ? `ID: ${id}` : 'ALL PASSWORDS';
    await logger.log('DELETE_PASSWORD', detail);
  };
};

