/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './shema';
import { resolvers } from './resolvers';
import { Request, Response } from 'express';
import cookieParser from 'cookie-parser';




export const createApolloServer = async (app: any) => {
  // Apply cookie parser middleware
  app.use(cookieParser());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }: { req: Request; res: Response }) => {
      // Get auth token from cookies if present
      const token = req.cookies?.token || '';
      
      return { 
        req, 
        res,
        token // Pass token to resolvers
      };
    },
  });

  await server.start();
  server.applyMiddleware({ 
    app,
    cors: { 
      origin: 'http://localhost:5173',
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization']
    } 
  });
}