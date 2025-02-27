import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const Sentry = require("@sentry/node");

import { join } from 'path';

// If taking advantage of automatic instrumentation (highly recommended)
import { Integrations as TracingIntegrations } from "@sentry/tracing";
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';

Sentry.init({
  dsn: 'https://23fa5a724def4d8bbc58845111e300b2@o324258.ingest.sentry.io/5668770',

  // This enables automatic instrumentation (highly recommended), but is not
  // necessary for purely manual usage
  integrations: [new TracingIntegrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    // logger: ['log', 'fatal', 'error', 'warn', 'debug', 'verbose']
  });

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Themeparks API')
    .setDescription('The Themeparks API description')
    .setVersion('1.0')
    .addTag('Themeparks')
    .addBearerAuth()
    .build();

  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/data/'
  });

  app.useGlobalPipes(new ValidationPipe());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
