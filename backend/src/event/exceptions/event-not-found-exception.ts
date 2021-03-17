import { HttpException } from '../../shared/http/http-exception';
import { StatusCodes } from 'http-status-codes';

export class EventNotFoundException extends HttpException {
  public static message: string = 'Event not found.';
  public static statusCode: StatusCodes = StatusCodes.NOT_FOUND;

  constructor() {
    super(EventNotFoundException.message, EventNotFoundException.statusCode);
  }
}
