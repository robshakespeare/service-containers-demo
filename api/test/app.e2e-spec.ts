import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { startAppAsync } from './e2e-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await startAppAsync();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it('/ (GET)', () => {
    // ACT & ASSERT
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((response) => expect(response.body.message).toEqual('Hello World!'));
  });
});
