import { Service } from '../shared/service-locator/service';
import { Connection, Repository } from 'typeorm';
import { EventRepository } from './event-repository';
import { Event } from './event';
import { EventNotFoundException } from './exceptions/event-not-found-exception';

export class EventService implements Service {
  public static ID: string = 'EVENT_SERVICE';
  private readonly _eventRepository: Repository<Event>;

  constructor(dbConnection: Connection) {
    this._eventRepository = EventRepository.fromConnection(dbConnection);
  }

  public getID(): string {
    return EventService.ID;
  }

  public async create(event: Event) {
    return this._eventRepository.save(event);
  }

  public async findByID(id: number, relations = ['author']): Promise<Event> {
    const event = await this._eventRepository.findOne({ id }, { relations });
    if (!event) throw new EventNotFoundException();
    return event;
  }

  public async findAll(relations = ['author']): Promise<Event[]> {
    return this._eventRepository.find({ relations });
  }

  public async updateByID(id: number, event: Event): Promise<Event> {
    const existingEvent = await this.findByID(id); // checks if event exists
    const updatedEvent = existingEvent.mergeIn(event);
    return this._eventRepository.save(updatedEvent);
  }

  public async removeByID(id: number): Promise<void> {
    const event = await this.findByID(id);
    await this._eventRepository.remove(event);
  }
}
