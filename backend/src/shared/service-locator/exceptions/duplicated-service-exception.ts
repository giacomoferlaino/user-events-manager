export class DuplicatedServiceException extends Error {
  public static message: string = 'Each service should have a unique ID.';

  constructor() {
    super(DuplicatedServiceException.message);
  }
}
