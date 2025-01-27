import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      firstName
      lastName
      accounts {
        id
        accountType
        balance
      }
    }
  }
`;
export const GET_USER_BY_SESSION = gql`
  query GetUserBySession {
    getUserBySessionToken {
      id
      email
      firstName
      lastName
      accounts {
        id
        accountType
        currency
        status
        accountNumber
        balance
      }
     
    }
  }
`;
