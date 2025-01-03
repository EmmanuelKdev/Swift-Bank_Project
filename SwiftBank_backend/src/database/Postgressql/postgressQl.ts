export interface User {
    id: string;
    email: string;
    password_hash: string;
    first_name: string;
    last_name: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Account {
    id: string;
    user_id: string;
    account_number: string;
    account_type: 'savings' | 'checking' | 'investment';
    balance: number;
    currency: string;
    status: 'active' | 'inactive' | 'frozen';
    created_at: Date;
    updated_at: Date;
  }
  
  export interface Transaction {
    id: string;
    account_id: string;
    transaction_type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    balance_after: number;
    description?: string;
    status: 'pending' | 'completed' | 'failed';
    created_at: Date;
  }