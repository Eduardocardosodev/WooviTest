import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';

import dotenv from 'dotenv';
import mongoose from 'mongoose';

import schema from './schemaGraphql';
import UserRepository from '../user/repository/mongoose/user.repository';

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3000;

const userRepository = new UserRepository();

const server = new ApolloServer({
  schema,
  context: ({ req }) => {
    const context = {
      req,
      token: req?.headers?.authorization,
      userRepository,
    };

    return context;
  },
});

async function startApolloServer(app: any) {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

async function connectDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected');

    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
export { startApolloServer, connectDb };
