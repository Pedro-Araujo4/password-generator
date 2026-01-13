import { IPasswordOptions } from '../models/password-model.js';

export const parsePasswordQuery = (query: any): IPasswordOptions => {
  return {
    length: Number(query.length) || 12,
    hasSymbols: String(query.symbols) === 'true', // transforma em string para evitar receber valores undefined ou null, além de que 
    noDuplicates: String(query.noDuplicates) === 'true' //ao colocar essa regra, você é obrigado a responder ?symbols=true no query para deixar a variável true
  };
};