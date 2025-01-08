import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method } = request;
    const userAgent = request.get('user-agent') || '';
    const referer = request.get('referer') || '';
    const startTime = Date.now();

    response.on('close', () => {
      const { statusCode, statusMessage } = response;
      const contentLength = response.get('content-length');
      const endTime = Date.now();

      const elapsedTime = endTime - startTime;

      this.logger.log(
        `${method} {${request.originalUrl}} ${statusCode} ${statusMessage} ${contentLength} ${referer}- ${userAgent} ${ip} - ${elapsedTime}ms`,
      );
    });

    next();
  }
}
