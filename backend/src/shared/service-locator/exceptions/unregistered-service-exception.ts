export class UnregisteredServiceException extends Error {
  public static message: string = 'No service registered under the ID: ';

  constructor(serviceID: string) {
    const errorMessage: string =
      UnregisteredServiceException.message + serviceID;
    super(errorMessage);
  }
}
