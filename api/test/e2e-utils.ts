import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

const getRandomEphemeralPort = () => {
  const start = 10000;
  const end = 65500;
  const range = end - start;
  return Math.floor(start + (range * Math.random()));
}

export const startAppAsync = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  const port = getRandomEphemeralPort();
  await app.listen(port);
  console.debug(`App started ok (port : ${port})`);
  return app;
};
