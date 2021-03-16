import { UndefinedJwtSecretException } from './undefined-jwt-secret-exception';

export class Environment {
  private static _portVariable: string = 'PORT';
  private static _jwtSecretVariable: string = 'JWT_SECRET_KEY';
  public static defaultPort: number = 8080;
  public static developmentJwtSecret: string = 'developmentJwtSecret';

  public static init(): void {
    const nodeEnv: string = process.env['NODE_ENV'] || '';
    process.env['NODE_ENV'] = nodeEnv ? nodeEnv : 'development';
  }

  public static processPort(): number {
    const port: string | undefined = process.env[Environment._portVariable];
    return port ? parseInt(port) : Environment.defaultPort;
  }

  public static jwtSecret(): string {
    if (Environment.isDev()) return Environment.developmentJwtSecret;
    const jwtSecret: string = process.env[Environment._jwtSecretVariable] || '';
    if (!jwtSecret) throw new UndefinedJwtSecretException();
    return jwtSecret;
  }

  public static isProd(): boolean {
    return process.env['NODE_ENV'] === 'production';
  }

  public static isDev(): boolean {
    return process.env['NODE_ENV'] === 'development';
  }
}
