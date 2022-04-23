import { Logger } from '@nestjs/common';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  private logger = new Logger('Request-Interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // const { statusCode } = context.switchToHttp().getResponse();
    const { statusCode } = response;
    const { originalUrl, baseUrl, method, params, query, body, ip } = request;
    const userAgent = request.get('user-agent') || '';

    this.logger.log('Request Data', {
      originalUrl,
      method,
      params,
      query,
      body,
      baseUrl,
      userAgent,
    });

    // const contentLength = response.get('content-length');

    const now = Date.now();
    return next.handle().pipe(
      tap((data) => {
        // console.log(`After... ${Date.now() - now}ms`);
        this.logger.log('Response data', data);
        this.logger.log(
          `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip} ${
            Date.now() - now
          }ms`,
        );
      }),
    );
  }
}
