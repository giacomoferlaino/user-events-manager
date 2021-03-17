import { HttpException } from './http-exception';
import { StatusCodes } from 'http-status-codes';

export class HttpServerException extends HttpException {
  public static message: string = 'Internal server error.';
  public static statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor() {
    super(HttpServerException.message, HttpServerException.statusCode);
  }
}
