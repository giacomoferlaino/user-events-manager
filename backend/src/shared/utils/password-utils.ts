import { genSalt, hash } from 'bcryptjs';

export class PasswordUtils {
  private static _defaultSaltRounds = 10;

  public static async hash(
    password: string,
    saltRounds: number = PasswordUtils._defaultSaltRounds,
  ): Promise<string> {
    const salt: string = await genSalt(saltRounds);
    return hash(password, salt);
  }
}
