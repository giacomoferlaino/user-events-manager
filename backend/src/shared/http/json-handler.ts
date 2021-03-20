import { RequestContext } from './interfaces/request-context';
import { Handler, NextFunction, Request, Response } from 'express';
import { RequestHandler } from './interfaces/request-handler';
import { HttpResponse } from './http-response';
import { HttpMiddleware } from './types/http-middleware';

export class JsonHandler<T, U> implements RequestHandler {
  constructor(private _callback: HttpMiddleware<T>) {}

  public get(): Handler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const context: RequestContext = { req, res, next };
      try {
        const response: T = await this._callback(context);
        if (this.hasEmptyResponse(response)) return next();
        res.json(new HttpResponse(response));
      } catch (err) {
        next(err);
      }
    };
  }

  private hasEmptyResponse(response: T): boolean {
    return response === undefined || response === null;
  }
}
