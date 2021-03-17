import { RequestContext } from './interfaces/request-context';
import { Handler, NextFunction, Request, Response } from 'express';
import { RequestHandler } from './interfaces/request-handler';
import { ControllerHandler } from './types/controller-handler';
import { HttpResponse } from './http-response';

export class JsonHandler<T> implements RequestHandler {
  constructor(private _callback: ControllerHandler<T>) {}

  public get(): Handler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const context: RequestContext = { req, res, next };
      try {
        const response: T = await this._callback(context);
        res.json(new HttpResponse(response));
      } catch (err) {
        next(err);
      }
    };
  }
}
