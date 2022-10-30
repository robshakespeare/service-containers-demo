import { NestFactory } from '@nestjs/core';
import { createDatabaseIfNotExists } from './typeOrm.config';
import { AppModule } from './app.module';

const ensureDb = process.env.START_MODE_ENSURE_DATABASE_EXISTS === 'true';

async function bootstrap() {
  if (ensureDb) {
    await createDatabaseIfNotExists();
    process.exit(0);
  } else {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
  }
}

bootstrap();
