import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const Sentry = require("@sentry/node");

Sentry.init({
  dsn: 'https://23fa5a724def4d8bbc58845111e300b2@o324258.ingest.sentry.io/5668770',

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Themeparks API')
    .setDescription('The Themeparks API description')
    .setVersion('1.0')
    .addTag('Themeparks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
