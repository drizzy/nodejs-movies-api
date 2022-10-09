import bcrypt from 'bcryptjs';

/**
 * It takes a plain text string and returns a hashed string
 * @param textPlain - The text you want to encrypt.
 * @returns A hash of the textPlain
 */
const encrypt = async (textPlain) => {

  const hash = await bcrypt.hash(textPlain, 10);
  return hash;
  
}

/**
 * It takes a plain text password and a hashed password and returns a boolean value indicating whether
 * the plain text password matches the hashed password
 * @param passwordPlain - The password that the user entered.
 * @param hashPassword - The hashed password that you want to compare against.
 * @returns A promise that resolves to a boolean.
 */
const compare = async (passwordPlain, hashPassword) => {

  return await bcrypt.compare(passwordPlain, hashPassword);
  
}

export  { encrypt, compare }