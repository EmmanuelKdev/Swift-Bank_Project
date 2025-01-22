/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { query } from '../database/Postgressql/db';
import { generateAccountNumber } from '../utils/acountNumber';
import { processTransaction} from '../utils/transactionUtils';
import { generateSessionToken, hashPassword } from '../utils/authutils';
import { generate4DigitPin, generateVerificationCode } from '../utils/codegenerators';
import { AuthController } from '../controllers/authControllers';
import Joi from 'joi';

// User input schema validation
const userInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});

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

      

        getAccount: async (_: any, { id, res, req }: { id: string, res: any, req: any }) => {
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
      const { error } = userInputSchema.validate(input);
      if (error) {
        throw new Error(`Validation Error: ${error.details[0].message}`);
      }
  
      try {
        const { email, password, firstName, lastName } = input;
        const passwordHash = await hashPassword(password);
        const userCode = generateVerificationCode();
        const pin = generate4DigitPin();
  
        const queryText = `
          INSERT INTO users (
            email, 
            password_hash, 
            first_name, 
            last_name, 
            user_code, 
            pin
          )
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING 
            id,
            email,
            first_name as "firstName",
            last_name as "lastName",
            user_code as "userCode",
            pin;
        `;
  
        const result = await query(queryText, [
          email,
          passwordHash,
          firstName,
          lastName,
          userCode,
          pin
        ]);
  
        if (!result[0]) {
          throw new Error('User creation failed');
        }
  
        return result[0];
      } catch (error: any) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user');
      }
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
    
    initiateWebLogin: async (parent: any, { email, password, res }: { email: string, password: string, res: any }) => {
      try{
          const response = await AuthController.initiateWebLogin(email, password);
           if(!response){
              return {
               status: 'failed',
               message: 'Invalid credentials'
             }
          }

       
        console.log(response)
        res.cookie('session_token', response.user.session_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });

        return {
          userId: response.user.id,
          user: response.user.first_name,
          sessionToken: response.user.session_token,
          status: 'success',
          message: 'Web login initiated',
          

        }
      } catch (error: any) {
        console.error('Error initiating web login:', error);
        return {
          status: 'failed',
          message: 'Error initiating web login:' + error
        }
      }

    }
     ,
    
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