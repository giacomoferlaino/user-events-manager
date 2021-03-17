import { createConnection } from 'typeorm';
import { User } from './user/user';
import { Event } from './event/event';

export class Database {
  public static async createConnection() {
    return createConnection({
      type: 'mysql',
      host: 'localhost',
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
