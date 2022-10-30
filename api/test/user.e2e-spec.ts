import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { v4 as uuid } from 'uuid';
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
      .expect((response) => expect(response.body.message).toEqual('No user found with id of: non-existent-id'));
  });

  it('PUT new user without id, generates an id for the user, and saves and returns the user', async () => {
    const firstName = `firstName${getRandomNumber()}`;
    const lastName = `lastName${getRandomNumber()}`;

    // ACT
    const response = await request(app.getHttpServer()).put('/user').send({
      firstName,
      lastName,
    });

    // ASSERT
    expect(response.statusCode).toBe(200);
    expect(response.body.id).not.toBeFalsy();
    expect(response.body.id).toHaveLength(36); // uuid string length
    expect(response.body).toEqual(
      expect.objectContaining({
        firstName,
        lastName,
        isActive: true,
      }),
    );
  });

  it('PUT new user with an id, does not generate an id for the user, and saves and returns the user', async () => {
    const id = uuid();
    const firstName = `firstName${getRandomNumber()}`;
    const lastName = `lastName${getRandomNumber()}`;

    // ACT
    const response = await request(app.getHttpServer()).put('/user').send({
      id,
      firstName,
      lastName,
    });

    // ASSERT
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        id,
        firstName,
        lastName,
        isActive: true,
      }),
    );
  });

  it('does create, read and update as expected', async () => {
    const firstName = `firstName${getRandomNumber()}`;
    const lastName = `lastName${getRandomNumber()}`;
    let id: string;

    // ACT & ASSERT: Create
    {
      const createResponse = await request(app.getHttpServer()).put('/user').send({
        firstName,
        lastName,
      });

      expect(createResponse.statusCode).toBe(200);
      expect(typeof createResponse.body.id).toBe('string');

      id = createResponse.body.id as string;
      expect(id).toBeDefined();
    }

    // ACT & ASSERT: Read
    {
      const readResponse = await request(app.getHttpServer()).get(`/user/${id}`).send();

      expect(readResponse.statusCode).toBe(200);
      expect(readResponse.body).toEqual(
        expect.objectContaining({
          id,
          firstName,
          lastName,
          isActive: true,
        }),
      );
    }

    // ACT & ASSERT: Update
    {
      const updateResponse = await request(app.getHttpServer())
        .put('/user')
        .send({
          id,
          firstName: `Updated ${firstName}`,
          lastName: `Updated ${lastName}`,
          isActive: false,
        });

      expect(updateResponse.statusCode).toBe(200);
      expect(updateResponse.body).toEqual(
        expect.objectContaining({
          id,
          firstName: `Updated ${firstName}`,
          lastName: `Updated ${lastName}`,
          isActive: false,
        }),
      );
    }

    // ACT & ASSERT: Re-Read
    {
      const readResponse = await request(app.getHttpServer()).get(`/user/${id}`).send();

      expect(readResponse.statusCode).toBe(200);
      expect(readResponse.body).toEqual(
        expect.objectContaining({
          id,
          firstName: `Updated ${firstName}`,
          lastName: `Updated ${lastName}`,
          isActive: false,
        }),
      );
    }
  });
});
