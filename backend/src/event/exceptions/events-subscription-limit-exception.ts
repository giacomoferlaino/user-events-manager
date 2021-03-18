import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class EventsSubscriptionLimitException extends HttpException {
  public static message: string = 'Events subscription limit reached.';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(
      EventsSubscriptionLimitException.message,
      EventsSubscriptionLimitException.statusCode,
    );
  }
}
