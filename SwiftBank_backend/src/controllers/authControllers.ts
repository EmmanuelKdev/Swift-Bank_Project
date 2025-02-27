/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '../database/Postgressql/db';
import { comparePasswords, generateSessionToken} from '../utils/authutils';
//import { generateVerificationCode} from '../utils/codegenerators';
import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
//import path from 'path';
//import { sendPushNotification } from '../utils/pushnotifications';

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

    console.log('Attempting Web Login');
    try {
      const user = await query('SELECT * FROM users WHERE email = $1', [email]);
  
      // Step 1: Validate user
      if (!user[0] || !(await comparePasswords(password, user[0].password_hash))) {
        throw new Error('Invalid credentials');
      } 
          // Begin transaction
      await query('BEGIN');

      // Clear any existing session token
      await query(
        'UPDATE users SET session_token = NULL WHERE id = $1',
        [user[0].id]
      );

      // Generate and set new session token
      const sessToken = await generateSessionToken(user[0].id);
      console.log('New session token generated:', sessToken);

      // Update with new token
      const result = await query(
        'UPDATE users SET session_token = $1 WHERE id = $2 RETURNING *',
        [sessToken, user[0].id]
      );

      if (!result[0]) {
        await query('ROLLBACK');
        throw new Error('Failed to update session token');
      }

      // Commit transaction
      await query('COMMIT');
      console.log('Session token updated for user:', result[0].id);

      const newUserdata = await query('SELECT * FROM users WHERE id = $1', [result[0].id]);
      console.log('Pdated User data:', newUserdata[0]);
     
      
      return { user: newUserdata[0] };
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