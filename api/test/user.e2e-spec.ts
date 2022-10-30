import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRandomNumber, startAppAsync } from './e2e-utils';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startAppAsync();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('GET user with non existent id returns 404 not found', () => {
    // ACT & ASSERT
    return request(app.getHttpServer())
      .get('/user/non-existent-id')
      .expect(404)
      .expect(response => expect(response.body.message).toEqual('No user found with id of: non-existent-id'));
  });

  it('PUT new user without id, generates an id for the user, and saves and returns the user', async () => {
    const firstName = `firstName${getRandomNumber()}`;
    const lastName = `lastName${getRandomNumber()}`;

    // ACT
    const response = await request(app.getHttpServer())
      .put('/user')
      .send({
        firstName,
        lastName,
      });

    // ASSERT
    expect(response.statusCode).toBe(200);
    expect(response.body.id).not.toBeFalsy();
    expect(response.body.id).toHaveLength(36); // uuid string length
    expect(response.body).toEqual(expect.objectContaining({
      firstName,
      lastName,
      isActive: true,
    }));
  });
});
