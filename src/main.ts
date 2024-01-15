require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});

  app.useGlobalPipes(new ValidationPipe());
  
  const port = process.env.PORT || 4200;
  app.enableCors();
  await app.listen(port);
  console.log(`Server is running and listening on port ${port}`);
}
bootstrap();
