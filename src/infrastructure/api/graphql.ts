import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import Koa from 'koa';
import Router from '@koa/router';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'koa-bodyparser';

import schema from './schemaGraphql';
import UserRepository from '../user/repository/mongoose/user.repository';

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const PORT = process.env.PORT || 3000;

// Inicializar o servidor Koa
// const app = new Koa();
// const router = new Router();

/// Iniciar o servidor Apollo de forma assíncrona
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

// await server.start();
async function connectDb() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected');

    // app.use(bodyParser());
    // app.use(router.routes());
    // app.use(router.allowedMethods());

    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
connectDb();
// Conectar ao MongoDB e iniciar o servidor Koa
