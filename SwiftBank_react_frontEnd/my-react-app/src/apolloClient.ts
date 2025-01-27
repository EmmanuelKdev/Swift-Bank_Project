import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const COOKIE_NAME = import.meta.env.VITE_COOKIE_NAME || 'swissbank';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/graphql';


const httpLink = createHttpLink({
  uri: API_URL,
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  try {
    const token = Cookies.get(COOKIE_NAME);
    console.log('Session token:', token ? 'Present' : 'Not found');
    
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error accessing cookies:', error);
    return { headers };
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
  connectToDevTools: true,
});

export default client;