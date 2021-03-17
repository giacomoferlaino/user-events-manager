import { Connection, Repository } from 'typeorm';
import { UserEntity } from './user-entity';

export class UserRepository {
  public static fromConnection(
    dbConnection: Connection,
  ): Repository<UserEntity> {
    return dbConnection.getRepository(UserEntity);
  }
}
