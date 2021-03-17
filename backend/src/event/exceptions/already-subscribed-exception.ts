import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class AlreadySubscribedException extends HttpException {
  public static message: string = 'You are already subscribed to this event.';
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(
      AlreadySubscribedException.message,
      AlreadySubscribedException.statusCode,
    );
  }
}
