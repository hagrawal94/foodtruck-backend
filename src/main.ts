require('dotenv').config({ path: `../.env` });
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

// external
const projectName = process.env.npm_package_name || 'foodtruck-backend';

// modules
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { loadSecrets } from './config/config';

async function bootstrap() {
  await loadSecrets();
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableShutdownHooks();
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST'],
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  const config = new DocumentBuilder()
    .setTitle('Food-Trucks-backend')
    .setDescription('The Food Trucks API description')
    .setVersion('1.0')
    .addTag('kjbn')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`App is listening on port ${port}`);
}

bootstrap();