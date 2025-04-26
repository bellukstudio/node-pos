import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import * as dotenv from 'dotenv';

dotenv.config(); // Load .env configuration

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Security headers middleware
  app.use(helmet());

  // Enable CORS for frontend access
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*', 
    credentials: true,
  });

  // Parse cookies from incoming requests
  app.use(cookieParser());

  // CSRF protection configuration
  const doubleCsrfOptions = {
    getSecret: () => process.env.CSRF_SECRET || 'default_csrf_secret', // Use environment variable for secret
    cookieName: '__Host-csrf-token',
    size: 64,
    getTokenFromRequest: (req: any) =>
      req.headers['x-csrf-token'] as string || '',
  };

  const { doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

  // Apply CSRF protection middleware
  app.use(doubleCsrfProtection);

  // Enable global request validation
  app.useGlobalPipes(new ValidationPipe());

  // Run pending database migrations
  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  // Start the application
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
