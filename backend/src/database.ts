import { createConnection } from 'typeorm';
import { UserEntity } from './user/user-entity';

export class Database {
  public static async createConnecion() {
    return createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'securePassword',
      database: 'userEvents',
      entities: [UserEntity],
      synchronize: true,
      logging: false,
    });
  }
}
