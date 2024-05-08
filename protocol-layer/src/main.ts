import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  // Create a Nest application instance
  const app = await NestFactory.create(AppModule, { cors: true });

  // Use Helmet for basic security headers
  app.use(helmet());

  // Use global validation pipe with whitelist option enabled
  app.useGlobalPipes(new ValidationPipe());

  // Set a global prefix for all routes, excluding the root and health check routes
  // Set global prefix for all routes
  app.setGlobalPrefix('api/v1', { exclude: ['/', '/health'] });

  // Retrieve the ConfigService to access configuration values
  const configService = app.get(ConfigService);

  // Start the application and listen on the configured port
  await app.listen(configService.get<string>('port'));
}
bootstrap();
