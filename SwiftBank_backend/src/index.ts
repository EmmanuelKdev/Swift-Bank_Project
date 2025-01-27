import express from 'express';
import dotenv from 'dotenv';
import initializeDatabase from './database/Postgressql/init';
import { createApolloServer } from './GraphQl/index';
import cookieParser from 'cookie-parser';
import bodyParser  from 'body-parser';


dotenv.config();

const app = express();
// Apply cookie parser middleware
app.use(cookieParser());
// Apply body parser middleware
app.use(bodyParser.json());
const port = process.env.PORT || 3002;

// Initialize the database Postgressql
const startApp = async () => {
  try {
    await initializeDatabase();
    // Initialize the Apollo Server
    await createApolloServer(app);
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
};

startApp();




app.listen(port, () => {
  console.log(` *** [Banking Server] *** ---> is running at http://localhost:${port}`);
});