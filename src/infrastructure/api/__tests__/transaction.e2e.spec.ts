import request from 'supertest';
import { app } from '../koa';
import { connectDb } from '../graphql';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('E2E test for transaction', () => {
  let authToken: string = '';
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a transaction', async () => {
    let tax_id: string = uuidv4();
    const createAccount1 = await request(app)
      .post('/account')
      .send({
        balance: 100,
        user: {
          name: 'Eduardo',
          tax_id,
          password: 'password',
        },
      });

    const createAccount2 = await request(app)
      .post('/account')
      .send({
        balance: 100,
        user: {
          name: 'Eduardo',
          tax_id: uuidv4(),
          password: 'password',
        },
      });

    const authenticate = await request(app).post('/authenticate').send({
      tax_id,
      password: 'password',
    });

    authToken = authenticate.body.token;

    const senderId = createAccount1.body.data.id;
    const receiverId = createAccount2.body.data.id;

    const response = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        sender: senderId,
        receiver: receiverId,
        value: 100,
      });

    expect(response.status).toBe(201);
    expect(response.body.data.sender).toBe(senderId);
    expect(response.body.data.receiver).toBe(receiverId);

    expect(response.body.data.value).toBe(100);
  });

  it('should not create transaction', async () => {
    const response = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        sender: 'sender_id',
        receiver: 'receiver_id',
        value: 10,
      });
    expect(response.status).toBe(400);
  });

  it('should list all transaction', async () => {
    let tax_id = uuidv4();

    const createAccount1 = await request(app)
      .post('/account')
      .send({
        balance: 999,
        user: {
          name: 'Eduardo',
          tax_id,
          password: 'password',
        },
      });

    const createAccount2 = await request(app)
      .post('/account')
      .send({
        balance: 999,
        user: {
          name: 'Eduardo',
          tax_id: uuidv4(),
          password: 'password',
        },
      });

    const senderId = createAccount1.body.data.id;
    const receiverId = createAccount2.body.data.id;

    const response = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        sender: senderId,
        receiver: receiverId,
        value: 1,
      });

    expect(response.status).toBe(201);

    const response2 = await request(app)
      .post('/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        sender: senderId,
        receiver: receiverId,
        value: 2,
      });

    expect(response2.status).toBe(201);

    const listResponse = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${authToken}`)
      .send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.data.length).toBeGreaterThanOrEqual(2);
  });
});
