import { StatusCodes } from 'http-status-codes';
import { HttpException } from '../../shared/http/http-exception';

export class InvalidCredentialsException extends HttpException {
  public static message: string = 'Invalid credentials.';
  public static statusCode: StatusCodes = StatusCodes.UNAUTHORIZED;

  constructor() {
    super(
      InvalidCredentialsException.message,
      InvalidCredentialsException.statusCode,
    );
  }
}
