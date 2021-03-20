import { UndefinedJwtSecretException } from './undefined-jwt-secret-exception';

export class Environment {
  public static portVariable: string = 'PORT';
  public static jwtSecretVariable: string = 'JWT_SECRET_KEY';
  public static dbHostVariable: string = 'DB_HOST';
  public static nodeEnvVariable: string = 'NODE_ENV';
  public static defaultNodeEnv: string = 'development';
  public static defaultPort: number = 8080;
  public static defaultDbHost: string = 'localhost';
  public static developmentJwtSecret: string = 'developmentJwtSecret';

  public static init(): void {
    const nodeEnv = process.env[Environment.nodeEnvVariable];
    process.env[Environment.nodeEnvVariable] = nodeEnv
      ? nodeEnv
      : Environment.defaultNodeEnv;
  }

  public static processPort(): number {
    const port: string | undefined = process.env[Environment.portVariable];
    return port ? parseInt(port) : Environment.defaultPort;
  }

  public static jwtSecret(): string {
    if (Environment.isDev()) return Environment.developmentJwtSecret;
    const jwtSecret = process.env[Environment.jwtSecretVariable];
    if (!jwtSecret) throw new UndefinedJwtSecretException(); // throws and exception to prevent the use of an unsafe key
    return jwtSecret;
  }

  public static isProd(): boolean {
    return process.env[Environment.nodeEnvVariable] === 'production';
  }

  public static isDev(): boolean {
    return process.env[Environment.nodeEnvVariable] === 'development';
  }

  public static dbHost(): string {
    const dbHost = process.env[Environment.dbHostVariable];
    return dbHost ? dbHost : Environment.defaultDbHost;
  }
}
