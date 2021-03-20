import { Handler, NextFunction, Request, Response } from 'express';
import rateLimit from 'express-rate-limit';
import { TooManyRequestsException } from './too-many-requests-exception';

export class RequestLimiterMiddleware {
  public static applyLimit(max: number, windowMs: number): Handler {
    return rateLimit({
      max,
      windowMs,
      handler(_: Request, __: Response, ___: NextFunction): void {
        throw new TooManyRequestsException();
      },
    });
  }
}
