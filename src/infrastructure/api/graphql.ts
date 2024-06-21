import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-koa';
import Koa from 'koa';

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import graphqlPlayground from 'graphql-playground-middleware-koa';

import schema from './schemaGraphql';
import UserRepository from '../user/repository/mongoose/user.repository';
import Router from 'koa-router';

dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const userRepository = new UserRepository();

const server = new ApolloServer({
  schema,
  context: ({ ctx }) => ({
    req: ctx.req,
    token: ctx.req?.headers?.authorization,
    userRepository,
  }),
  introspection: true,
});

async function startApolloServer(app: Koa) {
  const router = new Router();

  await server.start();
  server.applyMiddleware({ app, path: '/graphql', disableHealthCheck: true });

  router.all('/playground', graphqlPlayground({ endpoint: '/graphql' }));
  app.use(router.routes());
  app.use(router.allowedMethods());
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
