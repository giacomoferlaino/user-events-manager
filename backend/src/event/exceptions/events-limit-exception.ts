import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class EventsLimitException extends HttpException {
  public static message: string = 'Events limit reached.';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(EventsLimitException.message, EventsLimitException.statusCode);
  }
}
