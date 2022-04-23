import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import { WinstonConfig } from './winston.config';
// import * as Lodash from 'lodash';

@Injectable()
export class LoggerProvider extends ConsoleLogger implements LoggerService {
  get logger() {
    return WinstonConfig.getLogger();
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    const { messages, context } = this.parseContextAndMessage([
      message,
      ...optionalParams,
    ]);
    this.logger.log(messages, context);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    const { messages, context, stack } = this.parseContextAndMessageAndStack([
      message,
      ...optionalParams,
    ]);
    this.logger.error(messages, stack, context);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    const { messages, context } = this.parseContextAndMessage([
      message,
      ...optionalParams,
    ]);
    this.logger.warn(messages, context);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    const { messages, context } = this.parseContextAndMessage([
      message,
      ...optionalParams,
    ]);
    this.logger.debug(messages, context);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    const { messages, context } = this.parseContextAndMessage([
      message,
      ...optionalParams,
    ]);
    this.logger.verbose(messages, context);
  }

  private _getContextAndMessagesToPrint(args) {
    if ((args === null || args === void 0 ? void 0 : args.length) <= 1) {
      return { messages: args, context: this.context };
    }
    const lastElement = args[args.length - 1];
    const isContext = typeof lastElement === 'string';
    if (!isContext) {
      return { messages: args, context: this.context };
    }
    return {
      context: lastElement,
      messages: args.slice(0, args.length - 1),
    };
  }

  private _getContextAndStackAndMessagesToPrint(args) {
    const { messages, context } = this._getContextAndMessagesToPrint(args);
    if (
      (messages === null || messages === void 0 ? void 0 : messages.length) <= 1
    ) {
      return { messages, context };
    }
    const lastElement = messages[messages.length - 1];
    const isStack = typeof lastElement === 'string';
    if (!isStack) {
      return { messages, context };
    }
    return {
      stack: lastElement,
      messages: messages.slice(0, messages.length - 1),
      context,
    };
  }

  parseContextAndMessage(args) {
    const { messages, context } = this._getContextAndMessagesToPrint(args);
    return { messages: this.messageStringify(messages), context };
  }

  parseContextAndMessageAndStack(args) {
    const { messages, context, stack } =
      this._getContextAndStackAndMessagesToPrint(args);
    return { messages: this.messageStringify(messages), context, stack };
  }

  private messageStringify(messages) {
    // remove zeroth element:- Actual msg
    let msg = messages.shift();
    if (messages.length) {
      // got this code from console-logger.service.ts
      //\x1b[32m -> color code for console. Use emoji for better readability
      //https://stackoverflow.com/questions/47133451/can-i-change-the-color-of-log-data-in-winston
      msg +=
        '\x1b[32m' +
        JSON.stringify(messages, (key, value) =>
          typeof value === 'bigint' ? value.toString() : value,
        ) +
        '\x1b[37m';
    }
    return msg;
  }
}
