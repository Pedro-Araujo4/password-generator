import { IPasswordOptions } from '../models/password.model.js';

export const parsePasswordQuery = (query: any): IPasswordOptions => {
  return {
    length: Number(query.length) || 12,
    hasSymbols: String(query.symbols) === 'true',
    noDuplicates: String(query.noDuplicates) === 'true'
  };
};