import { Module } from '@nestjs/common';
import { ShortcodeService } from './shortcode.service';
import { ShortcodeController } from './shortcode.controller';
import { ShortcodeRepository } from './repositories/shortcode.repo';
import {
  ShortcodeSchema,
  Shortcode,
} from './repositories/schema/shortcode.schema';
import { MongooseModule } from '@nestjs/mongoose';
// import { BaseService } from '../../base/service';
// import { BaseRepository } from '../../base/repo';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Shortcode.name, schema: ShortcodeSchema },
    ]),
  ],
  controllers: [ShortcodeController],
  providers: [
    ShortcodeService,
    ShortcodeRepository,
    // BaseService,
    // BaseRepository,
  ],
})
export class ShortcodeModule {}
