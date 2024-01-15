require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Optional: Allow cookies and authentication headers
  });
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 4200;
  await app.listen(port);
  console.log(`Server is running and listening on port ${port}`);
}
bootstrap();
