import React from 'react';
import Card from 'react-bootstrap/Card';
import '../css/user_styles.css'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { setAccounts, setError, setLoading } from '@/redux/dataslice';
import { useMutation } from '@apollo/client';
import { CREATE_ACCOUNT } from '@/graphql/mutations';


function CreateAccount() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [accountType, setAccountType] = React.useState('');
  const [initialCurrency, setInitialCurrency] = React.useState('');
  const userId = useAppSelector((state: RootState) => state.data.user?.id);

  const [createAccount, { loading, error }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: (data) => {
      console.log(data);
      dispatch(setAccounts(data.createAccount)); // Store account in Redux
      dispatch(setError(null));
      navigate('/user_homepage');
    },
    onError: (error) => {
      console.error(error);
      dispatch(setError(error.message));
    },
  });

  const handleAccountType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(e.target.value);
  };

  const handleInitialDeposit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialCurrency(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Starting create account function', accountType, initialCurrency, userId);
    const currency = initialCurrency

    try {
      dispatch(setLoading(true));
      await createAccount({
        variables: {
          input: {
            userId,
            accountType,
            currency,
          },
        },
      });
    } catch (error) {
      console.error('Error creating account:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <div className='cardbox'>
        <Card>
          <Card.Header>
            <Card.Title>Create Account</Card.Title>
          </Card.Header>
          <Card.Body>
            {loading && <p>Loading...</p>}
            {error && <p className='text-danger'>Error: {error.message}</p>}
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='accountType'>Account Type</label>
                <select
                  className='form-control'
                  id='accountType'
                  value={accountType}
                  onChange={handleAccountType}
                >
                  <option value='SAVINGS'>SAVINGS</option>
                  <option value='CHECKING'>CHECKING</option>
                  <option value='INVESTMENT'>INVESTMENT</option>
                </select>
              </div>
              <div className='form-group'>
                <label htmlFor='initialCurrency'>Initial Deposit</label>
                <input
                  type='text'
                  className='form-control'
                  id='initialCurrency'
                  value={initialCurrency}
                  onChange={handleInitialDeposit}
                  min='0'
                />
              </div>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default CreateAccount;
