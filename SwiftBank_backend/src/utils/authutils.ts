import bcrypt from 'bcrypt';
import { generate4DigitPin } from './codegenerators';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

export const generateSessionToken = async (userId: string): Promise<string> => {
  const pin = generate4DigitPin();


  return await bcrypt.hash(userId+pin, 10);
}