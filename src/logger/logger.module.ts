import { Global, Module } from '@nestjs/common';
import { LoggerProvider } from './logger.service';
import { RequestLoggerMiddleware } from './request-logger.middleware';
import { WinstonConfig } from './winston.config';

@Global()
@Module({
  providers: [LoggerProvider, WinstonConfig, RequestLoggerMiddleware],
  exports: [RequestLoggerMiddleware],
})
export class LoggerModule {}
