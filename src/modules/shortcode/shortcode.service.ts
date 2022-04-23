import { Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/base/service';
import { CreateShortcodeDto } from './dto/create-shortcode.dto';
import { UpdateShortcodeDto } from './dto/update-shortcode.dto';
import { ShortcodeRepository } from './repositories/shortcode.repo';
import * as crypto from "crypto"

@Injectable()
export class ShortcodeService extends BaseService {
  protected logger = new Logger(ShortcodeService.name);

  constructor(repo: ShortcodeRepository){
    super(repo);
  }

  /**
   * 
   * @param length 
   * 
   * @reference: https://gist.github.com/uniibu/def853f402ded65b5c3111c7d489ea73
   */
  getUniqueAlias(len = 6, seed= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
    const sourceArray = seed.split('');
    let baseLen = typeof len === 'undefined' ? sourceArray.length : len;
    const rnd = crypto.randomBytes(baseLen);
    const result = [];
    let counter = 0, characterIndex, r;
    while (baseLen > 0) {
      r = rnd[counter];
      characterIndex = r % sourceArray.length;
      result.push(sourceArray.splice(characterIndex, 1)[0]);
      baseLen--;
      counter++;
    }
    return result.join('');
  }

  async create(createShortcodeDto: CreateShortcodeDto) {

    let shortcode = createShortcodeDto.shortcode;
    
    if(!shortcode){
      shortcode = this.getUniqueAlias()
    }

    let record = {
      url : createShortcodeDto.url,
      shortcode,
      startDate: Date(),
      lastSeenDate: null,
      redirectCount: 0
    }
    return await super.create(record);
  }

  async updateCount(id: string){
    try {
      const updateQuery = {
        $inc: {redirectCount: 1},
        lastSeenDate: Date()
      }
      return await this.update(id, updateQuery);
    }catch(error){
      //TODO: notify to admin
      this.logger.error('updateCount fail for ' + id, error)

    }
    return true;
    


  }
  // findAll() {
  //   return `This action returns all shortcode`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} shortcode`;
  // }

  // update(id: number, updateShortcodeDto: UpdateShortcodeDto) {
  //   return `This action updates a #${id} shortcode`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} shortcode`;
  // }
}
