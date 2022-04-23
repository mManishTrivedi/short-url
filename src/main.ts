import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { LoggerProvider } from './logger/logger.service';
import { RequestLoggerInterceptor } from './logger/request-logger.interceptor';
import { MongoExceptionFilter } from './database/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService: ConfigService = app.get<ConfigService>(ConfigService);
  //TODO: get server name from config
  const logger = new Logger('Short-URL-Server');

  app.useLogger(app.get(LoggerProvider));
  app.useGlobalInterceptors(new RequestLoggerInterceptor());

  // Use Mongo exception filter
  app.useGlobalFilters(new MongoExceptionFilter);


  //https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(new ValidationPipe({ transform: true,}));

  app.enableCors();

  const port = configService.get('port');
  await app.listen(port);

  logger.debug(` Server is listening on ${port}`);
}
bootstrap();