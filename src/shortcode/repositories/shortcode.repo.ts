import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/base/repo';
import { Shortcode, ShortcodeDocument } from './schema/shortcode.schema';
/**
 * I use the .service.ts for the business logic and the repository for every type of
 * connection to a Database or external API, that way is decoupled and I don’t have to change a lot of logic if I change the DB for example.
 */
@Injectable()
export class ShortcodeRepository extends BaseRepository {
  protected logger = new Logger(ShortcodeRepository.name);

  constructor(
    @InjectModel(Shortcode.name) private model: Model<ShortcodeDocument>,
  ) {
    super(model);
  }

  // findAll() {
  //   return `This action returns all Users`;
  // }

  // findOne(condition) {
  //   return `This action returns a #${id} device`;
  // }

  // update(id: number, updateDto: UpdateUserDto) {
  //   return `This action updates a #${id} device`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} device`;
  // }
}
