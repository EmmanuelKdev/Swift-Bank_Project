import { useQuery } from '@apollo/client';
import { GET_ACCOUNT_TRANSACTIONS } from '@/graphql/queries';
import Spinner from 'react-bootstrap/Spinner';
import '../css/user_styles.css'

interface Transaction {
    id: string;
    accountId: string;
    transactionType: string;
    amount: number;
    balanceAfter: number;
    description: string;
    status: string;
    createdAt: string;
  }

  const dummyTransactions: Transaction[] = [
    {
      id: '1',
      accountId: '123',
      transactionType: 'DEPOSIT',
      amount: 1000,
      balanceAfter: 2000,
      description: 'Salary deposit',
      status: 'COMPLETED',
      createdAt: '2025-02-01T10:00:00Z'
    },
    {
      id: '2',
      accountId: '123',
      transactionType: 'WITHDRAWAL',
      amount: 200,
      balanceAfter: 1800,
      description: 'ATM withdrawal',
      status: 'COMPLETED',
      createdAt: '2025-02-05T14:30:00Z'
    },
    {
      id: '3',
      accountId: '123',
      transactionType: 'TRANSFER',
      amount: 500,
      balanceAfter: 1300,
      description: 'Transfer to savings account',
      status: 'PENDING',
      createdAt: '2025-02-10T09:15:00Z'
    }
  ];
  
  const TransactionsList = ({ accountId }: { accountId: string }) => {
    const { loading, error, data } = useQuery(GET_ACCOUNT_TRANSACTIONS, {
      variables: { accountId }
    });
  
    if (loading) return <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>;
    if (error) return <p>Error loading transactions</p>;
    if (!data) return <p>No transactions</p>;
  
    const transactions: Transaction[] = data.getAccountTransactions;

    const getTransactionSymbol = (transactionType: string) => {
      switch (transactionType) {
        case 'DEPOSIT':
          return '+'; // Plus symbol for deposit
        case 'WITHDRAWAL':
          return '-'; // Minus symbol for withdrawal
        case 'TRANSFER':
          return '<>'; // Transfer symbol
        default:
          return '❓'; // Question mark for unknown types
      }
    };

 
  
    return (
      <ul className='transaction_list_items'>
        
        {dummyTransactions.map(transaction => (
          <li key={transaction.id}>
           
            
            
            <div className='description_amount'>
              <div className='transaction_image'>
                <img src={`https://ui-avatars.com/api/?name=${transaction.description}&background=random`} alt='transaction' />
                

              </div>
              <div className='balance_data'>
               <p>{transaction.description}</p>
               <p>{getTransactionSymbol(transaction.transactionType)} {transaction.amount}</p>

              </div>
             
             
            </div>
            <div className='date_status'>
              <p> {transaction.status}</p>
              <p>{new Date(transaction.createdAt).toLocaleDateString()}</p>
            </div>
           
          </li>
        ))}
      </ul>
    );
  };
  
  export default TransactionsList;