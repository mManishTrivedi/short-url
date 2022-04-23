import { Logger } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  QueryOptions,
  ReturnsNewDoc,
  UpdateQuery,
} from 'mongoose';
import mongodb = require('mongodb');

export class BaseRepository {
  protected logger: Logger; // = new Logger(BaseRepository.name);
  protected repo?: Model<any>;

  constructor(model: any) {
    this.repo = model;
  }

  async create(dataToSave: any) {
    this.logger.debug('Create new document', { dataToSave });
    const modelInstance = new this.repo(dataToSave);
    return modelInstance.save();
  }

  async findById(_id: string) {
    const data = await this.repo.findById({ _id }).exec();
    return data;
  }

  async findOne(condition: any, option?: QueryOptions | null) {
    const data = await this.repo.findOne(condition, option).exec();
    return data;
  }

  async findAll(filter: FilterQuery<any>, options?: QueryOptions | null) {
    return this.repo.find(filter, options?.fields, options);
  }

  /**
   *
   * @param filter Only update first one
   * @param updateQuery
   * @param options
   * @returns
   */
  async update(
    filter: FilterQuery<any>,
    updateQuery: UpdateQuery<any>,
    // options?: QueryOptions & { upsert: true } & ReturnsNewDoc,
    options: any,
  ) {
    this.logger.debug('update', { filter, updateQuery, options });
    return this.repo.findOneAndUpdate(filter, updateQuery, options);
  }

  async bulkWrite(
    writes: Array<any>,
    options?: mongodb.BulkWriteOptions,
  ): Promise<mongodb.BulkWriteResult> {
    return this.repo.bulkWrite(writes, options);
  }
}
