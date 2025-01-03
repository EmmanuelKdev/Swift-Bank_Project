import { gql } from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    firstName: String!
    lastName: String!
    accounts: [Account!]
    createdAt: String!
    updatedAt: String!
  }

  type Account {
    id: ID!
    accountNumber: String!
    accountType: AccountType!
    balance: Float!
    currency: String!
    status: AccountStatus!
    transactions: [Transaction!]
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  type Transaction {
    id: ID!
    accountId: ID!
    transactionType: TransactionType!
    amount: Float!
    balanceAfter: Float!
    description: String
    status: TransactionStatus!
    createdAt: String!
  }
  extend type Mutation {
    firstTimeMobileLogin(userCode: String!, pin: String!): AuthResponse!
    createNewPin(userCode: String!, pin: String!): AuthResponse!
    mobileLogin(pin: String!, mobileHash: String!): AuthResponse!
    initiateWebLogin(email: String!, password: String!): WebLoginResponse!
    verifyWebLogin(userId: String!, pin: String!): AuthResponse!
    verifyTransaction(pin: String!, transactionId: String!): Boolean!
  }

  type AuthResponse {
    user: User!
    token: String!
    mobileHash: String
  }

  type WebLoginResponse {
    userId: String!
    requiresMobileVerification: Boolean!
  }

  enum AccountType {
    SAVINGS
    CHECKING
    INVESTMENT
  }

  enum AccountStatus {
    ACTIVE
    INACTIVE
    FROZEN
  }

  enum TransactionType {
    DEPOSIT
    WITHDRAWAL
    TRANSFER
  }

  enum TransactionStatus {
    PENDING
    COMPLETED
    FAILED
  }

  type Query {
    getUser(id: ID!): User
    getAccount(id: ID!): Account
    getUserAccounts(userId: ID!): [Account!]
    getAccountTransactions(accountId: ID!): [Transaction!]
    verificationMobileStatus(mobileHash: String!): AuthResponse!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    createAccount(input: CreateAccountInput!): Account!
    createTransaction(input: CreateTransactionInput!): Transaction!
    updateAccountStatus(id: ID!, status: AccountStatus!): Account!
  }

  input CreateUserInput {
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  input CreateAccountInput {
    userId: ID!
    accountType: AccountType!
    currency: String!
  }

  input CreateTransactionInput {
    accountId: ID!
    transactionType: TransactionType!
    amount: Float!
    description: String
  }
`;