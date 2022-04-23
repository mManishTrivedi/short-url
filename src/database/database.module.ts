import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { initiateMongooseLogger } from 'src/logger/logger.mongoose';

initiateMongooseLogger();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      // imports: [ConfigModule, LoggerModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mongoDBConfig'),
    }),
  ],
})
export class DatabaseModule {}
