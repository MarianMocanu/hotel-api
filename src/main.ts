require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000', // Replace with your frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    // credentials: true, // Optional: Allow cookies and authentication headers
  });
  const port = process.env.PORT
  await app.listen(port);
  console.log(`Server is running and listening on port ${port}`);
}
bootstrap();
