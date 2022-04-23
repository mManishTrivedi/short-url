import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('Request-Middleware');

  //https://docs.nestjs.com/interceptors#basics
  use(request: Request, response: Response, next: NextFunction): void {
    // const { ip, method, baseUrl } = request;
    const { originalUrl, baseUrl, method, params, query, body, ip } = request;
    const userAgent = request.get('user-agent') || '';

    // const userAgent = request.get('user-agent') || '';


    this.logger.log('Request Data', {
      originalUrl,
      method,
      params,
      query,
      body,
      baseUrl,
      userAgent,
    });

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      //   this.logger.log('Response Data', response);
      //   console.log(response);

      this.logger.log(
        `${method} ${baseUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    next();
  }
}
