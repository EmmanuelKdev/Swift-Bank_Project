import { transaction } from '../database/Postgressql/db';

interface TransactionInput {
  accountId: string;
  transactionType: 'DEPOSIT' | 'WITHDRAWAL' | 'TRANSFER';
  amount: number;
  description?: string;
  toAccountId?: string; // For transfers
}

export const processTransaction = async (input: TransactionInput) => {
  const { accountId, transactionType, amount, description, toAccountId } = input;

  if (amount <= 0) {
    throw new Error('Transaction amount must be positive');
  }

  return await transaction(async (client) => {
    // Lock the source account
    const sourceAccount = await client.query(
      'SELECT balance, currency, status FROM accounts WHERE id = $1 FOR UPDATE',
      [accountId]
    );

    if (!sourceAccount.rows[0]) {
      throw new Error('Source account not found');
    }

    if (sourceAccount.rows[0].status !== 'ACTIVE') {
      throw new Error('Source account is not active');
    }

    let newSourceBalance = sourceAccount.rows[0].balance;

    // Handle different transaction types
    switch (transactionType) {
      case 'DEPOSIT':
        newSourceBalance += amount;
        break;

      case 'WITHDRAWAL':
        if (sourceAccount.rows[0].balance < amount) {
          throw new Error('Insufficient funds');
        }
        newSourceBalance -= amount;
        break;

      case 'TRANSFER':
        if (!toAccountId) {
          throw new Error('Destination account is required for transfers');
        }
        if (sourceAccount.rows[0].balance < amount) {
          throw new Error('Insufficient funds');
        }

        // Lock the destination account
        const destAccount = await client.query(
          'SELECT balance, currency, status FROM accounts WHERE id = $1 FOR UPDATE',
          [toAccountId]
        );

        if (!destAccount.rows[0]) {
          throw new Error('Destination account not found');
        }

        if (destAccount.rows[0].status !== 'ACTIVE') {
          throw new Error('Destination account is not active');
        }

        // Perform transfer
        newSourceBalance -= amount;
        const newDestBalance = destAccount.rows[0].balance + amount;

        // Update destination account
        await client.query(
          'UPDATE accounts SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
          [newDestBalance, toAccountId]
        );

        // Record destination transaction
        await client.query(
          `INSERT INTO transactions 
           (account_id, transaction_type, amount, balance_after, description, related_account_id) 
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [toAccountId, 'DEPOSIT', amount, newDestBalance, description, accountId]
        );
        break;

      default:
        throw new Error('Invalid transaction type');
    }

    // Update source account balance
    await client.query(
      'UPDATE accounts SET balance = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [newSourceBalance, accountId]
    );

    // Record source transaction
    const transactionResult = await client.query(
      `INSERT INTO transactions 
       (account_id, transaction_type, amount, balance_after, description, related_account_id) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [accountId, transactionType, amount, newSourceBalance, description, toAccountId]
    );

    return transactionResult.rows[0];
  });
};