import { INestApplication } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "../src/app.module";

export const getRandomNumber = (start = 1000, end = 9999) => {
  const range = end - start;
  return Math.floor(start + (range * Math.random()));
}

const getRandomEphemeralPort = () => getRandomNumber(10000, 30000);

export const startAppAsync = async (): Promise<INestApplication> => {
  const app = await NestFactory.create(AppModule);
  const port = getRandomEphemeralPort();
  await app.listen(port);
  console.debug(`App started ok (port : ${port})`);
  return app;
};
