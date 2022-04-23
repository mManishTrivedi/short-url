import { Test, TestingModule } from '@nestjs/testing';
import { ShortcodeController } from './shortcode.controller';
import { ShortcodeService } from './shortcode.service';
import { ShortcodeRepository } from './repositories/shortcode.repo';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShortcodeSchema,
  Shortcode,
  ShortcodeDocument,
} from './repositories/schema/shortcode.schema';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'src/logger/logger.module';
import configuration from 'src/config/configuration';
import { DatabaseModule } from 'src/database/database.module';

import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('ShortcodeController', () => {
  let controller: ShortcodeController;
  let mockShortcodeModel: Model<ShortcodeDocument>;
  let mockRepository: ShortcodeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
        LoggerModule,
        DatabaseModule,
        MongooseModule.forFeature([
          { name: Shortcode.name, schema: ShortcodeSchema },
        ]),
      ],
      controllers: [ShortcodeController],
      // providers: [ShortcodeService, ShortcodeRepository],
      providers: [
        {
          provide: getModelToken(Shortcode.name),
          useValue: Model, // <-- Use the Model Class from Mongoose
        },
        ShortcodeService,
        ShortcodeRepository,
      ],
    }).compile();

    controller = module.get<ShortcodeController>(ShortcodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
