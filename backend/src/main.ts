import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: 'https://df1b-197-211-63-15.ngrok-free.app',
    credentials: true,
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app
    .listen(process.env.PORT ?? 3000)
    .then(() => console.log(`Connected via PORT ${process.env.PORT}`));
}
bootstrap();
