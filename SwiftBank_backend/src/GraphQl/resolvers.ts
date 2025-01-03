/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '../database/Postgressql/db';
import { generateAccountNumber } from '../utils/acountNumber';
import { processTransaction} from '../utils/transactionUtils';
import { hashPassword } from '../utils/authutils';
import { generate4DigitPin, generateVerificationCode } from '../utils/codegenerators';
import { AuthController } from '../controllers/authControllers';

// Transaction interface
interface TransactionInput {
  accountId: string;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description?: string;
  toAccountId?: string; // For transfers
}
export const resolvers = {
  Query: {
    getUser: async (_: any, { id,res,req }: { id: string, res: any, req: any }) => {
      const result = await query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return result[0];
    },

    getAccount: async (_: any, { id,res,req }: { id: string, res: any, req: any }) => {
      const result = await query(
        'SELECT * FROM accounts WHERE id = $1',
        [id]
      );
      return result[0];
    },

    getUserAccounts: async (_: any, { userId, res, req }: { userId: string, res: any, req: any }) => {
      return await query(
        'SELECT * FROM accounts WHERE user_id = $1',
        [userId]
      );
    },

    getAccountTransactions: async (_: any, { accountId, res, req }: { accountId: string, res: any, req: any }) => {
      return await query(
        'SELECT * FROM transactions WHERE account_id = $1 ORDER BY created_at DESC',
        [accountId]
      );
    },
    verificationMobileStatus: async (_: any, { mobileHash, req, res }: { mobileHash: string, req: any, res: any }) => {
      const user = await query(
        'SELECT * FROM users WHERE mobilehash = $1',
        [mobileHash]
      )
      if (!user[0]) {
        //throw new Error('User not found');
        return false
      }
      return true
    }
  },

  Mutation: {
    //create user via web Registration
    createUser: async (_: any, { input }: { input: any }) => {
      const { email, password, firstName, lastName } = input;
      const passwordHash = await hashPassword(password);
      const userCode = generateVerificationCode();
      const pin = generate4DigitPin();
      const SessionToken = ''
      
      const result = await query(
        'INSERT INTO users (email, password_hash, first_name, last_name, user_Code, pin, session_tocken) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [email, passwordHash, firstName, lastName, userCode, pin, SessionToken]
      );
      return result[0];
    },

    // create account for user

    createAccount: async (_: any, { input, req, res }: { input: any, req: any, res: any }) => {
      const { userId, accountType, currency } = input;
      const accountNumber = generateAccountNumber(); 
      
      const result = await query(
        'INSERT INTO accounts (user_id, account_number, account_type, currency) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, accountNumber, accountType, currency]
      );
      return result[0];
    },

    // Login operations

    // first time mobile login
    firstTimeMobileLogin: (_: unknown, { userCode, pin }: { userCode: string, pin: string }) => 
      AuthController.firstTimeMobileLogin(userCode, pin),
    
    mobileLogin: (_: unknown, { pin,req, res,  }: { pin: string, req: any, res: any }) => {
      const mobileHash = req.headers['mobile-hash'];
      return AuthController.mobileLogin(pin, mobileHash)

    } ,
    
    initiateWebLogin: (_: unknown, { email, password }: { email: string, password: string }) => 
      AuthController.initiateWebLogin(email, password),
    
    verifyWebLogin: (_: unknown, { userId, pin }: { userId: string, pin: string }) => 
      AuthController.verifyWebLogin(userId, pin),
    
    verifyTransaction: (_: unknown, { pin, transactionId }: { pin: string, transactionId: string }, { user }: { user: { id: string } }) => 
      AuthController.verifyTransaction(user.id, pin, transactionId),
    createNewPin: (_: unknown, { userCode, pin, res, req}: { userCode: string, pin: string, res: any, req: any }) => {

      AuthController.createNewPin(userCode, pin)

    }
     ,

    createTransaction: async (_: any, { input }: { input: TransactionInput }) => {
      try {
        return await processTransaction(input);
      }  catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Transaction failed: ${message}`);
      }
    },
  },

  User: {
    accounts: async (parent: any) => {
      return await query(
        'SELECT * FROM accounts WHERE user_id = $1',
        [parent.id]
      );
    },
  },

  Account: {
    user: async (parent: any) => {
      const result = await query(
        'SELECT * FROM users WHERE id = $1',
        [parent.user_id]
      );
      return result[0];
    },
    transactions: async (parent: any) => {
      return await query(
        'SELECT * FROM transactions WHERE account_id = $1',
        [parent.id]
      );
    },
  },
};