import { Environment } from './environment';
import { UndefinedJwtSecretException } from './undefined-jwt-secret-exception';

describe('Environment', () => {
  afterEach(() => {
    process.env = {};
  });

  describe('init', () => {
    it('should should set the NODE_ENV to development if not differently specified', () => {
      // jest set the variable to 'test' by default
      process.env[Environment.nodeEnvVariable] = '';
      Environment.init();
      const nodeEnv = process.env[Environment.nodeEnvVariable];
      expect(nodeEnv).toEqual(Environment.defaultNodeEnv);
    });
  });

  describe('processPort', () => {
    it('should return the default port if a custom one is not defined', () => {
      expect(Environment.processPort()).toEqual(Environment.defaultPort);
    });

    it('should return a custom port if defined inside the environment', () => {
      const customPort: number = 1000;
      process.env[Environment.portVariable] = String(customPort);
      expect(Environment.processPort()).toEqual(customPort);
    });
  });

  describe('jetSecret', () => {
    it('should return a default value if in development mode', () => {
      process.env[Environment.nodeEnvVariable] = 'development';
      expect(Environment.jwtSecret()).toEqual(Environment.developmentJwtSecret);
    });

    it('should throw an error if not defined and not in development mode', () => {
      expect(() => Environment.jwtSecret()).toThrow(
        UndefinedJwtSecretException,
      );
    });

    it('should return the custom JWT secret key', () => {
      const customKey = 'customSuperSecureKey';
      process.env[Environment.jwtSecretVariable] = customKey;
      expect(Environment.jwtSecret()).toEqual(customKey);
    });
  });

  describe('isProd', () => {
    it('should return true if NODE_ENV is production', () => {
      process.env[Environment.nodeEnvVariable] = 'production';
      expect(Environment.isProd()).toBe(true);
    });

    it('should return false if is not production', () => {
      expect(Environment.isProd()).toBe(false);
    });
  });

  describe('isDev', () => {
    it('should return true if NODE_ENV is development', () => {
      process.env[Environment.nodeEnvVariable] = 'development';
      expect(Environment.isDev()).toBe(true);
    });

    it('should return false if is not development', () => {
      expect(Environment.isDev()).toBe(false);
    });
  });

  describe('dbHost', () => {
    it('should return the default host address if not differently defined', () => {
      expect(Environment.dbHost()).toEqual(Environment.defaultDbHost);
    });

    it('should return the address specified inside DB_HOST variable', () => {
      const customAddress = 'customHostAddress';
      process.env[Environment.dbHostVariable] = customAddress;
      expect(Environment.dbHost()).toEqual(customAddress);
    });
  });
});
