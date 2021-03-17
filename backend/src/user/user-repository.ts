import { Connection, Repository } from 'typeorm';
import { User } from './user';

export class UserRepository {
  public static fromConnection(dbConnection: Connection): Repository<User> {
    return dbConnection.getRepository(User);
  }
}
