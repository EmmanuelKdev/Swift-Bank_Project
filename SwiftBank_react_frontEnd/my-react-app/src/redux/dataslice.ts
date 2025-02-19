import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accounts: [];
}

interface Account {
  id: string;
  accountType: string;
  balance: number;
  currency: string;
  status: string;
  accountNumber: string;
}

interface Transactions {
  id: string;
  accountId: string;
  transactionType: string;
  amount: number;
  balanceAfter: number;
  description: string;
  status: string;
}

interface DataState {
  user: User | null;
  accounts: Account[];
  transactions: Transactions[];
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  user: null,
  accounts: [],
  transactions: [],
  isAuthenticated: false,
  loading: false,
  error: null
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    setTransActions: (state, action: PayloadAction<Transactions[]>) => {
      state.transactions = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    logout: (state) => {
      state.user = null;
      state.accounts = [];
      state.transactions = [];
      state.isAuthenticated = false;
    }
  }
});

export const { setUser, setAccounts, setTransActions ,setLoading, setError, logout } = dataSlice.actions;
export default dataSlice.reducer;