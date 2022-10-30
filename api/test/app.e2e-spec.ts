import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getAppAsync } from './e2e-utils';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    app = await getAppAsync();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect(response => expect(response.body.message).toEqual('Hello World!'));
  });
});
