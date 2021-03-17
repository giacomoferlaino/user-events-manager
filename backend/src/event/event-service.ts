import { Service } from '../shared/service-locator/service';
import { Connection, Repository } from 'typeorm';
import { EventEntity } from './event-entity';
import { EventRepository } from './event-repository';
import { Event } from './event';
import { EventNotFoundException } from './exceptions/event-not-found-exception';

export class EventService implements Service {
  public static ID: string = 'EVENT_SERVICE';
  private readonly _eventRepository: Repository<EventEntity>;

  constructor(dbConnection: Connection) {
    this._eventRepository = EventRepository.fromConnection(dbConnection);
  }

  public getID(): string {
    return EventService.ID;
  }

  public async create(event: Event) {
    const eventEntity = await this._eventRepository.save(event.toEntity());
    return Event.fromEntity(eventEntity);
  }

  public async findByID(id: number): Promise<Event> {
    const eventEntity = await this._eventRepository.findOne({ id });
    if (!eventEntity) throw new EventNotFoundException();
    return Event.fromEntity(eventEntity);
  }

  public async findAll(): Promise<Event[]> {
    const eventEntities = await this._eventRepository.find();
    return eventEntities.map<Event>((eventEntity) =>
      Event.fromEntity(eventEntity),
    );
  }

  public async updateByID(id: number, event: Event): Promise<Event> {
    const existingEvent = await this.findByID(id); // checks if event exists
    const updatedEvent = existingEvent.mergeIn(event);
    const updatedEventEntity = await this._eventRepository.save(
      updatedEvent.toEntity(),
    );
    return Event.fromEntity(updatedEventEntity);
  }

  public async removeByID(id: number): Promise<void> {
    await this._eventRepository.remove({ id });
  }
}
