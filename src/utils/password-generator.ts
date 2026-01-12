import crypto from 'crypto'; /*Usar o módulo nativo crypto do Node.js em vez de Math.random() 
                             para garantir aleatoriedade criptograficamente segura. */

//Função que gera uma senha aleatória baseada nos critérios.

export const generatePassword = (
  length: number, 
  hasSymbols: boolean, 
  noDuplicates: boolean
): string => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+";
  
  let characters = letters + numbers;
  if (hasSymbols) characters += symbols;

  // VALIDAÇÃO: Se o usuário quer 50 caracteres sem repetir, 
  // mas o charset só tem 40, daria um loop infinito ou erro.
  if (noDuplicates && length > characters.length) {
    throw new Error(`Impossível gerar senha de ${length} caracteres sem repetição. Máximo: ${characters.length}.`);
  }

  let password = "";
  let availableChars = characters.split("");

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, availableChars.length);
    const chosenChar = availableChars[randomIndex];
    password += chosenChar;

    if (noDuplicates) {
      availableChars.splice(randomIndex, 1);
    }
  }

  return password;
};