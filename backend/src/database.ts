import { createConnection } from 'typeorm';
import { User } from './user/user';
import { Event } from './event/event';
import { Environment } from './shared/environment/environment';

export class Database {
  public static async createConnection() {
    return createConnection({
      type: 'mysql',
      host: Environment.dbHost(),
      port: 3306,
      username: 'root',
      password: 'securePassword',
      database: 'userEvents',
      entities: [User, Event],
      synchronize: true,
      logging: false,
    });
  }
}
