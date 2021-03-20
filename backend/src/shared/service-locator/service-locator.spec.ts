import { ServiceLocator } from './service-locator';
import { Service } from './service';
import { DuplicatedServiceException } from './exceptions/duplicated-service-exception';
import { UnregisteredServiceException } from './exceptions/unregistered-service-exception';

describe('ServiceLocator', () => {
  let serviceMock: Service;

  afterEach(() => {
    (ServiceLocator as any)['_instance'] = null; // clearing instance after every test
  });

  describe('instance', () => {
    it('should create a new instance if it does not already exists', () => {
      expect(ServiceLocator['_instance']).toBeUndefined();
      ServiceLocator.instance; // accessing the getter triggers the function
      expect(ServiceLocator['_instance']).toBeInstanceOf(ServiceLocator);
    });
  });

  describe('register', () => {
    it('should throw an error if the service already exist', () => {
      const serviceId = 'serviceId';
      serviceMock = {
        getID: jest.fn().mockReturnValue(serviceId),
      } as Service;
      ServiceLocator.instance['_services'].set(serviceId, serviceMock);
      expect(() => ServiceLocator.instance.register(serviceMock)).toThrow(
        DuplicatedServiceException,
      );
    });

    it('should register a new service based on its ID', () => {
      const serviceId = 'serviceId';
      serviceMock = {
        getID: jest.fn().mockReturnValue(serviceId),
      } as Service;
      ServiceLocator.instance.register(serviceMock);
      expect(ServiceLocator.instance['_services'].get(serviceId)).toStrictEqual(
        serviceMock,
      );
    });
  });

  describe('get', () => {
    it('should throw an error if the service does not exist', () => {
      const serviceId: string = 'serviceId';
      expect(() => ServiceLocator.instance.get(serviceId)).toThrow(
        UnregisteredServiceException,
      );
    });

    it('should return the registered service', () => {
      const serviceId = 'serviceId';
      serviceMock = {
        getID: jest.fn().mockReturnValue(serviceId),
      } as Service;
      ServiceLocator.instance['_services'].set(serviceId, serviceMock);
      expect(ServiceLocator.instance.get(serviceId)).toStrictEqual(serviceMock);
    });
  });
});
