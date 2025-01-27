import bcrypt from 'bcrypt';
import { Response } from 'express';
import { generate4DigitPin } from './codegenerators';
import dotenv from 'dotenv';


dotenv.config();

const cookie = process.env.COOKIE_NAME || 'swissbank';

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
export const setCookie = (res: Response, token: string) => {
  
  
  if (!res || !res.cookie) {
    console.log(res);
    throw new Error('Response object is invalid', );
    
  }

  try {
    res.cookie(cookie, token, {
      domain: 'localhost',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    console.log('Cookie set successfully');
  } catch (error) {
    console.error('Error setting cookie:', error);
    throw new Error('Failed to set cookie');
  }
};
export const clearCookie = async (res: Response, cookie: string) => {
  

  try {
    res.clearCookie(cookie);
    console.log('Cookie cleared successfully');
  } catch {
    throw new Error('Failed to clear cookie');
  }

}
