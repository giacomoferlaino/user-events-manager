import { HttpException } from '../http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class TooManyRequestsException extends HttpException {
  public static message: string = 'Too many requests, please try again later.';
  public static statusCode: StatusCodes = StatusCodes.TOO_MANY_REQUESTS;

  constructor() {
    super(
      TooManyRequestsException.message,
      TooManyRequestsException.statusCode,
    );
  }
}
