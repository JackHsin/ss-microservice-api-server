import './setup-env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const { SS_SERVICE_API_PORT } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableCors();
  await app.listen(SS_SERVICE_API_PORT);
}
bootstrap();
