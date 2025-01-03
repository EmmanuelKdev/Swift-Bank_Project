import { query } from '../database/Postgressql/db';
import { comparePasswords } from '../utils/authutils';
import { generateVerificationCode} from '../utils/codegenerators';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';

export class AuthController {
  // First-time mobile login with 8-digit code + PIN
  static async firstTimeMobileLogin(userCode: string, pin: string) {
    try {
      const user = await query(
        'SELECT * FROM users WHERE user_code = $1 AND pin = $2 AND first_login = true',
        [userCode, pin]
      );

      if (!user[0]) {
        throw new GraphQLError('Invalid credentials or not first-time login');
      }

      // Generate mobile device hash
      const mobileHash = jwt.sign(
        { userId: user[0].id, type: 'mobile' },
        process.env.JWT_SECRET!
      );

      // Update user as no longer first login
      await query(
        'UPDATE users SET first_login = false, mobile_hash = $1 WHERE id = $2',
        [mobileHash, user[0].id]
      );

      return {
        user: user[0],
        mobileHash,
        token: jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!)
      };
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  static async createNewPin(userCode: string, pin: string) {
    try {
      const user = await query(
        'SELECT * FROM users WHERE user_code = $1 AND first_login = false',
        [userCode]
      );

      if (!user[0]) {
        throw new Error('Invalid credentials or not first-time login');
      }

      await query(
        'UPDATE users SET pin = $1 WHERE id = $2',
        [pin, user[0].id]
      );

      return {
        user: user[0],
        token: jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!)
      };
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  // Regular mobile login with PIN + stored hash
  static async mobileLogin(pin: string, mobileHash: string) {
    try {
      const decoded = jwt.verify(mobileHash, process.env.JWT_SECRET!) as { userId: string };
      
      const user = await query(
        'SELECT * FROM users WHERE id = $1 AND pin = $2 AND mobile_hash = $3',
        [decoded.userId, pin, mobileHash]
      );

      if (!user[0]) {
        throw new Error('Invalid credentials');
      }

      return {
        user: user[0],
        token: jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!)
      };
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  // Web login with mobile verification
  static async initiateWebLogin(email: string, password: string) {
    try {
      const user = await query('SELECT * FROM users WHERE email = $1', [email]);
      
      if (!user[0] || !await comparePasswords(password, user[0].password_hash)) {
        throw new Error('Invalid credentials');
      }

      // Generate temporary verification code
      const verificationCode = generateVerificationCode(5); // 5 minutes expiry
      
      await query(
        'UPDATE users SET web_verification_code = $1, web_verification_expires = $2 WHERE id = $3',
        [verificationCode.code, verificationCode.expiresAt, user[0].id]
      );

      return { userId: user[0].id, requiresMobileVerification: true };
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  // Verify web login with mobile PIN
  static async verifyWebLogin(userId: string, pin: string) {
    try {
      const user = await query(
        'SELECT * FROM users WHERE id = $1 AND pin = $2',
        [userId, pin]
      );

      if (!user[0]) {
        throw new Error('Invalid PIN');
      }

      return {
        user: user[0],
        token: jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET!)
      };
    } catch (error) {
      throw new Error(`Verification failed: ${error}`);
    }
  }

  // Verify transaction with PIN
  static async verifyTransaction(userId: string, pin: string, transactionId: string) {
    try {
      const user = await query(
        'SELECT * FROM users WHERE id = $1 AND pin = $2',
        [userId, pin]
      );

      if (!user[0]) {
        throw new Error('Invalid PIN');
      }

      await query(
        'UPDATE transactions SET verified = true WHERE id = $1',
        [transactionId]
      );

      return true;
    } catch (error) {
      throw new Error(`Transaction verification failed: ${error}`);
    }
  }
}