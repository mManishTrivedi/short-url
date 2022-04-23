import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { DevicesModule } from './modules/devices/devices.module';
import { DatabaseModule } from './database/database.module';
import configuration from 'src/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './logger/logger.module';
// import { UsersModule } from './modules/users/users.module';
// import { AuthModule } from './modules/auth/auth.module';
import { RequestLoggerMiddleware } from './logger/request-logger.middleware';
// import { SitesModule } from './modules/sites/sites.module';
// import { DataModule } from './modules/data/data.module';
// import { EventsModule } from './modules/events/events.module';
import { ShortcodeModule } from './modules/shortcode/shortcode.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    // DevicesModule,
    // UsersModule,
    // AuthModule,
    ShortcodeModule,
    // SitesModule,
    // EventsModule,
    // DataModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //consumer.apply(RequestLoggerMiddleware).forRoutes('/');
  }
}
