import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

let app: INestApplication | null = null;

export const getAppAsync = async (): Promise<INestApplication> => {
  if (app == null) {
    app = await NestFactory.create(AppModule);
    await app.listen(8000);
    console.debug('App started ok');
  }

  return app;
};

export const dispose = async () => {
  if (app) {
    console.debug('Closing app...');
    try {
      await app.close();
    }
    finally {
      app = null;
    }
    console.debug('App closed ok');
  }
};

