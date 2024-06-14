import Koa from 'koa';
import Router from 'koa-router';
import mongoose from 'mongoose';
import { accountRoute } from './routes/account.route';
import bodyParser from 'koa-bodyparser';

const router = new Router();
export const app = new Koa();

app.use(bodyParser());
router.use('/account', accountRoute.routes(), accountRoute.allowedMethods());

app.use(router.routes());
app.use(router.allowedMethods());

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ingyz5d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

connectDB();
