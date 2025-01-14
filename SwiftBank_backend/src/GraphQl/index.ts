/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './shema';
import { resolvers } from './resolvers';
import { Request, Response } from 'express';




export const createApolloServer = async (app: any) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }: { req: Request, res: Response })  => {
     
     
      return { req, res };
    },
  });

 
 
  await server.start();
  server.applyMiddleware({ app , cors: { 
    origin: 'http://localhost:5173', credentials: true,methods: ['GET', 'POST', 'OPTIONS'],allowedHeaders: ['Content-Type', 'Authorization'] } });
};