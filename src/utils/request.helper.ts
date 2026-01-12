import { IPasswordOptions } from '../models/password.model';

export const parsePasswordQuery = (query: any): IPasswordOptions => {
  return {
    length: Number(query.length) || 12,
    hasSymbols: query.symbols === 'true',
    noDuplicates: query.noDuplicates === 'true'
  };
};