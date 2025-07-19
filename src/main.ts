import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as process from 'node:process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { useContainer } from 'class-validator';
import { accpuntingSvcConfig } from './config/ms.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  //
  app.use(bodyParser.json({ limit: '10mb' }));
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
  //
  const appName: string = process.env.APP_NAME as string;
  //
  const logger = new Logger(appName, {
    timestamp: true,
  });
  //
  app.setGlobalPrefix('api', {
    exclude: ['/', '/health', '/metrics', '/docs', '/redocs'],
  });
  //
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true, // пропускати відсутні поля (для PATCH)
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  //
  const config = new DocumentBuilder()
    .setTitle(appName)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    swaggerOptions: {
      tagsSorter: 'manual', // або 'manual'
      operationsSorter: 'operationId', // або функція
    },
  });
  //
  const PORT = process.env.PORT || 3003;
  //
  await app.listen(+PORT, () => {
    logger.log(`Environment: ${process.env.NODE_ENV}`);
    logger.log(`Application is running on http://localhost:${PORT}`);
    logger.log(`Docs is running on http://localhost:${PORT}/docs`);
    logger.log(`Rebit is running on http://localhost:15672/#/queues`);
  });
  //
  await startMicroservices(app, logger);
}

async function startMicroservices(app: NestExpressApplication, logger: Logger) {
  try {
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: accpuntingSvcConfig,
    });
    await app.startAllMicroservices();
    logger.log('Microservices started successfully');
  } catch (error) {
    logger.error('Failed to start microservices', error);
    // Handle error without crashing the main app
  }
}

bootstrap()
  .then(() => console.log(`Starting ${process.env.APP_NAME}...`))
  .catch((err) => console.log(err));
