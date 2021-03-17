import { Connection, Repository } from 'typeorm';
import { Event } from './event';

export class EventRepository {
  public static fromConnection(dbConnection: Connection): Repository<Event> {
    return dbConnection.getRepository(Event);
  }
}
