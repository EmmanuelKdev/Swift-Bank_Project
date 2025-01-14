import {  transaction } from './db';

const initializeDatabase = async () => {
  try {
    // Create tables with proper constraints
    await transaction(async (client) => {

      // Create UUID extension first
       await client.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
       
      // Users table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          first_name VARCHAR(100) NOT NULL,
          last_name VARCHAR(100) NOT NULL,
          user_code VARCHAR(255) NOT NULL,
          pin VARCHAR(255) NOT NULL,
          session_token VARCHAR(255) NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Accounts table
      await client.query(`
        CREATE TABLE IF NOT EXISTS accounts (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          account_number VARCHAR(20) UNIQUE NOT NULL,
          account_type VARCHAR(50) NOT NULL,
          balance DECIMAL(15,2) NOT NULL DEFAULT 0.00 CHECK (balance >= 0),
          currency VARCHAR(3) NOT NULL DEFAULT 'USD',
          status VARCHAR(20) NOT NULL DEFAULT 'active',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Transactions table
      await client.query(`
        CREATE TABLE IF NOT EXISTS transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          account_id UUID NOT NULL REFERENCES accounts(id),
          transaction_type VARCHAR(50) NOT NULL,
          amount DECIMAL(15,2) NOT NULL,
          balance_after DECIMAL(15,2) NOT NULL,
          description TEXT,
          status VARCHAR(20) NOT NULL DEFAULT 'completed',
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create indexes for better performance
      await client.query(`
        CREATE INDEX IF NOT EXISTS idx_transactions_account_id ON transactions(account_id);
        CREATE INDEX IF NOT EXISTS idx_accounts_user_id ON accounts(user_id);
        CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at);
      `);
    });

    console.log('**[Postgressql]*** ---> Database initialized successfully');
  } catch (error) {
    console.error('**[Postgressql]*** ---> Error initializing database:', error);
    throw error;
  }
};

export default initializeDatabase;