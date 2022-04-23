import { Injectable, Logger } from '@nestjs/common';
import * as _ from 'lodash';
import { QueryOptions, ReturnsNewDoc, UpdateQuery } from 'mongoose';
import { BaseRepository } from './repo';

@Injectable()
export class BaseService {
  protected logger = new Logger(BaseService.name);

  constructor(private repository: BaseRepository) {}

  // create(createDeviceDto: CreateDeviceDto) {
  async create(createDto: any) {
    return await this.repository.create(createDto);
  }

  async findAll(filter: any, options?: QueryOptions) {
    return await this.repository.findAll(filter, options);
  }

  async findOne(filter, options?: QueryOptions) {
    return await this.repository.findOne(filter, options);
  }

  async updateById(
    _id: string,
    updateQuery: UpdateQuery<any>,
    options?: QueryOptions & { upsert: true } & ReturnsNewDoc,
  ) {
    return this.repository.update({ _id }, updateQuery, options);
  }

  update(
    id: string,
    updateQuery: UpdateQuery<any>,
    options?: QueryOptions & { upsert: true } & ReturnsNewDoc,
  ): Promise<any>   | string | boolean {
    this.logger.debug('update record', { id, updateQuery, options });
    if (_.isEmpty(updateQuery)) {
      return true;
    }
    return this.updateById(id, updateQuery, options);
  }

  remove(id: number): Promise<any> | string | boolean {
    return `This action removes a #${id} device`;
  }
}
