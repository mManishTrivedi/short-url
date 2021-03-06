import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware';
import { ShortcodeModule } from './shortcode/shortcode.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    ShortcodeModule,

  ],
  // controllers: [],
  // providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('/');
  }
}
