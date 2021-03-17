import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class UnauthorizedUserException extends HttpException {
  public static message: string = 'Unauthorized user error.';
  public static statusCode: StatusCodes = StatusCodes.UNAUTHORIZED;

  constructor() {
    super(
      UnauthorizedUserException.message,
      UnauthorizedUserException.statusCode,
    );
  }
}
