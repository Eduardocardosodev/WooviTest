import request from 'supertest';
import { app, startRouteKoa } from '../koa';
import { connectDb, startApolloServer } from '../graphql';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('E2E test for account', () => {
  beforeAll(async () => {
    await connectDb();
    await startRouteKoa();
    await startApolloServer(app);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a account', async () => {
    const response = await request(app.callback())
      .post('/account')
      .send({
        balance: 100,
        user: {
          name: 'Eduardo',
          tax_id: uuidv4(),
          password: 'password',
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.data.user.name).toBe('Eduardo');
    expect(response.body.data.balance).toBe(100);

    expect(response.body.data.user.password).toBeDefined();
  });

  it('should not create account', async () => {
    const response = await request(app.callback()).post('/account').send({
      balance: 100,
      user: null,
    });
    expect(response.status).toBe(400);
  });

  it('should list all account', async () => {
    let tax_id = uuidv4();

    const response = await request(app.callback())
      .post('/account')
      .send({
        balance: 100,
        user: {
          name: 'Eduardo',
          tax_id,
          password: 'password',
        },
      });

    const authenticate = await request(app.callback())
      .post('/authenticate')
      .send({
        tax_id,
        password: 'password',
      });

    let authToken: string = authenticate.body.token;
    expect(response.status).toBe(201);

    const response2 = await request(app.callback())
      .post('/account')
      .send({
        balance: 102,
        user: {
          name: 'Eduardo2',
          tax_id: uuidv4(),
          password: 'password2',
        },
      });

    expect(response2.status).toBe(201);

    const listResponse = await request(app.callback())
      .get('/account')
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.length).toBeGreaterThanOrEqual(2);
  });
});
