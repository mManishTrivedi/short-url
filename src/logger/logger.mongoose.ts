import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

export const initiateMongooseLogger = function () {
  const logger = new Logger('Mongoose');

  //configure logger
  //   mongoose.set('debug', true);
  mongoose.set('debug', (collectionName, method, query, doc) => {
    //TODO: enable log on demand
    logger.debug(`${collectionName}.${method}`, {
      query: JSON.stringify(query),
      doc,
    });
  });
};
