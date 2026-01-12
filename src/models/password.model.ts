// Define o que o nosso Service precisa receber
export interface IPasswordOptions {
  length: number;
  hasSymbols: boolean;
  noDuplicates: boolean;
}

// Define o formato padrão de todas as respostas de sucesso da API
export interface IPasswordResponse {
  password: string;
  length: number;
  createdAt: string; 
  formattedDate: string;
}

// Define o padrão para respostas de erro
export interface IErrorResponse {
  status: 'error';
  message: string;
}

export interface IValidationResult {
  isValid: boolean;
  error?: string;
}

export const validatePasswordLength = (length: number): IValidationResult => {
  if (isNaN(length)) {
    return { isValid: false, error: "Não é um número." };
  }
  if (length <= 0 || length > 100) {
    return { isValid: false, error: "Tamanho deve ser entre 1 e 100." };
  }
  return { isValid: true };
};

export interface IPasswordRecord extends IPasswordResponse {
  id: string; // Cada senha terá um identificador único
}