import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('MyService');

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Setup swagger
  const config = new DocumentBuilder()
  .setTitle('My Service')
  .setDescription('The my service API')
  .setVersion('0.1')
  .addTag('configs')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableShutdownHooks();

  await app.listen(3000);
  logger.log(`App running on ${await app.getUrl()}`);
  return app;
}
bootstrap();
