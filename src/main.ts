import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
import registerSwaggerModule from './core/swagger/swagger';

dotenv.config(); // Load .env configuration
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());

  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  app.use(cookieParser());

  // OPSI 1: Disable CSRF untuk development
  if (process.env.NODE_ENV !== 'production') {
    console.log('⚠️  CSRF protection disabled for development');
  } else {
    // CSRF hanya aktif di production
    const doubleCsrfOptions = {
      getSecret: () => process.env.CSRF_SECRET || 'default_csrf_secret',
      cookieName: '__Host-csrf-token',
      size: 64,
      getTokenFromRequest: (req: any) =>
        req.headers['x-csrf-token'] as string || '',
    };

    const { doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

    app.use((req: any, res: any, next: any) => {
      if (req.originalUrl && (req.originalUrl.startsWith('/swagger') || req.originalUrl.startsWith('/api/swagger'))) {
        return next();
      }
      return doubleCsrfProtection(req, res, next);
    });
  }

  const configService = app.get(ConfigService);
  await registerSwaggerModule(app, configService);

  app.useGlobalPipes(new ValidationPipe());

  const dataSource = app.get(DataSource);
  await dataSource.runMigrations();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();