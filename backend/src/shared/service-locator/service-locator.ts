import { Service } from './service';
import { DuplicatedServiceException } from './exceptions/duplicated-service-exception';
import { UnregisteredServiceException } from './exceptions/unregistered-service-exception';

export class ServiceLocator {
  private static _instance: ServiceLocator;
  private _services: Map<string, Service>;

  private constructor() {
    this._services = new Map();
  }

  public static get instance(): ServiceLocator {
    if (!ServiceLocator._instance) {
      ServiceLocator._instance = new ServiceLocator();
    }
    return ServiceLocator._instance;
  }

  public register(service: Service): void {
    if (this._services.has(service.getID()))
      throw new DuplicatedServiceException();
    this._services.set(service.getID(), service);
  }

  public get(serviceID: string): Service {
    if (!this._services.has(serviceID))
      throw new UnregisteredServiceException(serviceID);
    return this._services.get(serviceID) as Service;
  }
}
