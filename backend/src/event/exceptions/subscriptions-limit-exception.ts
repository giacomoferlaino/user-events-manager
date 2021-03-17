import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class SubscriptionsLimitException extends HttpException {
  public static message: string = 'Subscription limit reached.';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(
      SubscriptionsLimitException.message,
      SubscriptionsLimitException.statusCode,
    );
  }
}
