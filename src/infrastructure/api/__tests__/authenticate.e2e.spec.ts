import request from 'supertest';
import { app } from '../koa';
import { connectDb } from '../graphql';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

describe('E2E test for authenticate', () => {
  beforeAll(async () => {
    await connectDb();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a authenticate', async () => {
    let tax_id = uuidv4();

    const responseAccount = await request(app)
      .post('/account')
      .send({
        balance: 100,
        user: {
          name: 'Eduardo',
          tax_id,
          password: 'password34',
        },
      });

    const response = await request(app).post('/authenticate').send({
      tax_id,
      password: 'password34',
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user._name).toBe('Eduardo');
  });

  it('should not create authenticate', async () => {
    const response = await request(app).post('/authenticate').send({
      tax_id: '43DV',
      password: 'password34',
    });
    expect(response.status).toBe(500);
  });
});
