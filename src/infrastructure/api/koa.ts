import Koa from 'koa';
import Router from 'koa-router';
import { accountRoute } from './routes/account.route';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import http from 'http';
import { transactionRoute } from './routes/transaction.route';
import { authenticateRoute } from './routes/authenticate.route';
dotenv.config();

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

const server = http.createServer(app.callback());

export { server as app };
