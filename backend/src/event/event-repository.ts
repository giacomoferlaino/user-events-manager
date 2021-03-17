import { Connection, Repository } from 'typeorm';
import { EventEntity } from './event-entity';

export class EventRepository {
  public static fromConnection(
    dbConnection: Connection,
  ): Repository<EventEntity> {
    return dbConnection.getRepository(EventEntity);
  }
}
