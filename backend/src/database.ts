import { createConnection } from 'typeorm';
import { UserEntity } from './user/user-entity';
import { EventEntity } from './event/event-entity';

export class Database {
  public static async createConnection() {
    return createConnection({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'securePassword',
      database: 'userEvents',
      entities: [UserEntity, EventEntity],
      synchronize: true,
      logging: false,
    });
  }
}
