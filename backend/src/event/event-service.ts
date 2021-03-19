import { Service } from '../shared/service-locator/service';
import { Connection, Repository } from 'typeorm';
import { EventRepository } from './event-repository';
import { Event } from './event';
import { EventNotFoundException } from './exceptions/event-not-found-exception';
import { User } from '../user/user';

export class EventService implements Service {
  public static ID: string = 'EVENT_SERVICE';
  private readonly _eventRepository: Repository<Event>;

  constructor(dbConnection: Connection) {
    this._eventRepository = EventRepository.fromConnection(dbConnection);
  }

  public getID(): string {
    return EventService.ID;
  }

  public async create(eventData: Object, author: User) {
    const newEvent = Event.fromObject(eventData);
    newEvent.setAuthor(author);
    return this._eventRepository.save(newEvent);
  }

  public async findByID(
    id: number,
    relations = ['author', 'subscribers'],
  ): Promise<Event> {
    const event = await this._eventRepository.findOne({ id }, { relations });
    if (!event) throw new EventNotFoundException();
    return event;
  }

  public async findAll(
    relations = ['author', 'subscribers'],
  ): Promise<Event[]> {
    return this._eventRepository.find({ relations });
  }

  public async updateByID(id: number, eventData: Object): Promise<Event> {
    const existingEvent = await this.findByID(id);
    const updatedEvent = existingEvent.mergeObject(eventData);
    return this._eventRepository.save(updatedEvent);
  }

  public async removeByID(id: number): Promise<void> {
    const event = await this.findByID(id);
    await this._eventRepository.remove(event);
  }
}
