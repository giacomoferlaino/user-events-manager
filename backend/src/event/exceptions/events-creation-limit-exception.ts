import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class EventsCreationLimitException extends HttpException {
  public static message: string = 'Events creation limit reached.';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(
      EventsCreationLimitException.message,
      EventsCreationLimitException.statusCode,
    );
  }
}
