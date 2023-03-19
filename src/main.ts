import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();
  const port = 3001;

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(port);

  logger.log(`Application is listening on Port: ${port}...`);
}
bootstrap();
