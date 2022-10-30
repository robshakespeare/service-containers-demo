import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { startAppAsync } from './e2e-utils';

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

  it('GET user with non existent id return 404 not found', () => {
    return request(app.getHttpServer())
      .get('/user/non-existent-id')
      .expect(404)
      .expect(response => expect(response.body.message).toEqual('No user found with id of: non-existent-id'));
  });
});
