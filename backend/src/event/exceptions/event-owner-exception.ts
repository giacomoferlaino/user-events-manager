import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class EventOwnerException extends HttpException {
  public static message: string = "You can't subscribe to your own event.";
  public static statusCode: StatusCodes = StatusCodes.BAD_REQUEST;

  constructor() {
    super(EventOwnerException.message, EventOwnerException.statusCode);
  }
}
