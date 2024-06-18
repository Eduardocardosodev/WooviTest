import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import { accountRoute } from './routes/account.route';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import { transactionRoute } from './routes/transaction.route';
import { authenticateRoute } from './routes/authenticate.route';
dotenv.config();
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const router = new Router();
const app = new Koa();

app.use(bodyParser());
router.use('/account', accountRoute.routes(), accountRoute.allowedMethods());
router.use(
  '/transactions',
  transactionRoute.routes(),
  transactionRoute.allowedMethods()
);
router.use(
  '/authenticate',
  authenticateRoute.routes(),
  authenticateRoute.allowedMethods()
);

app.use(router.routes());
app.use(router.allowedMethods());

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();
export { app };
