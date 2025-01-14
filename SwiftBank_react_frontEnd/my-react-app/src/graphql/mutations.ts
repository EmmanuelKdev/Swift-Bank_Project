import { gql } from '@apollo/client';

// This is a GraphQL mutation that creates a new user
export const CREATE_USER = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
      email
      firstName
      lastName
      
      
    }
  }
`;