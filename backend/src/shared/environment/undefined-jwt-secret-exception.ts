export class UndefinedJwtSecretException extends Error {
  public static message: string =
    'A JWT secret key is mandatory [JWT_SECRET_KEY]';

  constructor() {
    super(UndefinedJwtSecretException.message);
  }
}
