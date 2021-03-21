import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class MissingAuthorException extends HttpException {
  public static message: string = 'An Event has to refer to an Author';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(MissingAuthorException.message, MissingAuthorException.statusCode);
  }
}
