import { StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  constructor(public message: string, public statusCode: StatusCodes) {
    super(message);
  }

  public toJSON(): any {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
