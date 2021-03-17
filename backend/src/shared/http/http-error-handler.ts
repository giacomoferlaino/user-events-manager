import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { HttpException } from './http-exception';
import { HttpResponse } from './http-response';
import { HttpServerException } from './http-server-exception';

export class HttpErrorHandler {
  public get(): ErrorRequestHandler {
    return (err: Error, req: Request, res: Response, _: NextFunction) => {
      if (err instanceof HttpException) {
        const response = new HttpResponse(undefined, err);
        res.status(err.statusCode).json(response);
        return;
      }
      console.error(err);
      const response = new HttpResponse(undefined, new HttpServerException());
      res.status(HttpServerException.statusCode).send(response);
    };
  }
}
