import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import * as MongooseError from 'mongoose/lib/error';
import { MongoError } from 'mongodb';
// import { MongoError } from 'mongodb';
// import { MongoError } from 'mongoose/node_modules/mongodb';

//@reference: https://stackoverflow.com/questions/50864001/how-to-handle-mongoose-error-with-nestjs

@Catch(MongoError)
@Catch(MongooseError)
export class MongoExceptionFilter implements ExceptionFilter {
  protected logger = new Logger(MongoExceptionFilter.name);
  catch(exception: MongooseError | MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest<Request>();

    let errorData;
    if (exception instanceof MongoError) {
      errorData = this.handleMongoError(exception);
    } else {
      errorData = this.handleMongooseError(exception);
    }

    const error = {
      statusCode: errorData.statusCode
        ? errorData.statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR,
      message: errorData.message ? errorData.message : 'Internal DB Error',
    };

    this.logger.error('error', { path: request.url, errorData, exception });

    response.status(error.statusCode).json(error);
  }

  handleMongoError(exception: MongoError) {
    // prepare error data
    const errorData = {
      message: exception.message,
      code: exception?.code,
      stack: exception?.stack,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR
    };
    // do whatever you want here
    switch (exception.code) {
      case 11000:
        // duplicate exception
        errorData.statusCode = HttpStatus.NOT_ACCEPTABLE 
        break;
      default:
        break;
    }
    this.logger.error('Error from MongoDB', errorData);
    return errorData;
  }

  handleMongooseError(exception: MongooseError) {
    let error;

    switch (exception.name) {
      case 'DocumentNotFoundError': {
        error = {
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Not Found',
        };
        break;
      }
      // case 'MongooseError': { break; } // general Mongoose error
      // case 'CastError': { break; }
      // case 'DisconnectedError': { break; }
      // case 'DivergentArrayError': { break; }
      // case 'MissingSchemaError': { break; }
      // case 'ValidatorError': { break; }
      // case 'ValidationError': { break; }
      // case 'ObjectExpectedError': { break; }
      // case 'ObjectParameterError': { break; }
      // case 'OverwriteModelError': { break; }
      // case 'ParallelSaveError': { break; }
      // case 'StrictModeError': { break; }
      // case 'VersionError': { break; }
      default: {
        error = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Internal DB Error',
        };
        break;
      }
    }

    return error;
  }
}
