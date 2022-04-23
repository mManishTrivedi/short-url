import * as winston from 'winston';
import { WinstonModule } from 'nest-winston';
const { format, transports } = winston;
import { LoggerService, OnModuleInit } from '@nestjs/common';

export class WinstonConfig implements OnModuleInit {
  public static Logger: LoggerService;

  static getLogger() {
    return WinstonConfig.Logger;
  }

  onModuleInit() {
    const rootPath = './logs'; // TODO: get path from config
    const fileName = 'app-name.log';
    // define the custom settings for each transport (file, console)
    const options = {
      file: {
        level: 'info',
        filename: `${rootPath}/${fileName}`,
        handleExceptions: true,
        json: true,
        maxsize: 1024 * 1024 * 100, // 100MB
        maxFiles: 30,
        colorize: false,
      },
      console: {
        level: 'debug', // alert > error > warning > notice > info > debug
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };
    const logFormat = format.printf((info) => {
      // @Ref: https://stackoverflow.com/questions/47231677/how-to-log-full-stack-trace-with-winston-3
      if (info.stack) {
        return `${info.timestamp} ${info.level}: [\x1b[33m${info.context}\x1b[37m] ${info.message} \n ${info.stack} `;
      }
      return `${info.timestamp} ${info.level}: [\x1b[33m${info.context}\x1b[37m] ${info.message}`;
    });

    // instantiate a new Winston Logger with the settings defined above
    WinstonConfig.Logger = WinstonModule.createLogger({
      format: winston.format.combine(
        winston.format.errors({ stack: true }),
        format.colorize(),
        format.timestamp(),
        logFormat,
        // format.json()
        // winston.format.printf((msg) => {console.log(msg);
        //   return `${msg.timestamp} [${msg.level}] - [${msg.context}] ${msg.message}`;
        // }),
      ),
      transports: [
        // new winston.transports.File(options.file),
        new winston.transports.Console(options.console),
      ],
      exitOnError: false, // do not exit on handled exceptions
    });

    // // create a stream object with a 'write' function that will be used by `morgan`
    // logger.stream = {
    //   write: function (message, encoding) {
    //     // use the 'info' log level so the output will be picked up by both transports (file and console)
    //     logger.info(message);
    //   },
    // };

    // return WinstonConfig.Logger;
  }
}