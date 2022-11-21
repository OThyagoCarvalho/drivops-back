import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: env.CORS_ORIGIN,
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
  });
  await app.listen(3333);
}
bootstrap();
