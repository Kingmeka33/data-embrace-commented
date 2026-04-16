import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create NestJS app
  const app = await NestFactory.create(AppModule);

  // Enable CORS so frontend can communicate with backend
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:8080',
    credentials: true,
  });

  // Automatically validate incoming requests
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Start server
  await app.listen(process.env.PORT || 3000);

  console.log(`Backend running on http://0.0.0.0:${process.env.PORT || 3000}`);console.log(`Backend running on http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
