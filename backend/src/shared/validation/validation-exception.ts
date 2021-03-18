import { HttpException } from '../http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class ValidationException extends HttpException {
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor(message: string) {
    super(message, ValidationException.statusCode);
  }
}
