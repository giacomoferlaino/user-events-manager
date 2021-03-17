export class HttpException extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }

  public toJSON(): any {
    return {
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
