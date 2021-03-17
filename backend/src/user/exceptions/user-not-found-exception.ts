import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class UserNotFoundException extends HttpException {
  public static message: string = 'User not found.';
  public static statusCode: StatusCodes = StatusCodes.NOT_FOUND;

  constructor() {
    super(UserNotFoundException.message, UserNotFoundException.statusCode);
  }
}
