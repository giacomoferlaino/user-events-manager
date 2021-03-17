import { EntityConverter } from '../shared/orm/entity-converter';
import { EventEntity } from './event-entity';
import { EventStates } from './event-states';

export class Event implements EntityConverter<EventEntity> {
  public readonly id: number;
  public readonly headline: string;
  public readonly description: string;
  public readonly startDate: Date;
  public readonly location: string;
  public readonly state: EventStates;

  public static fromEntity(event: EventEntity): Event {
    return new Event({ ...event });
  }

  public static fromObject(object: any): Event {
    const eventEntity = EventEntity.fromObject(object);
    return Event.fromEntity(eventEntity);
  }

  constructor({
    id,
    headline,
    description,
    startDate,
    location,
    state,
  }: EventEntity) {
    this.id = id || 0;
    this.headline = headline || '';
    this.description = description || '';
    this.startDate = startDate || new Date(0);
    this.location = location || '';
    this.state = state || EventStates.Private;
  }

  public mergeIn(event: Event): Event {
    return new Event({
      id: event.id === 0 ? this.id : event.id,
      headline: event.headline === '' ? this.headline : event.headline,
      description:
        event.description === '' ? this.description : event.description,
      startDate:
        event.startDate === new Date(0) ? this.startDate : event.startDate,
      location: event.location === '' ? this.location : event.location,
    });
  }

  public toEntity(): EventEntity {
    return EventEntity.fromObject(this.toObject());
  }

  public toObject(): any {
    return {
      id: this.id,
      headline: this.headline,
      description: this.description,
      startDate: this.startDate,
      location: this.location,
    };
  }

  public toJSON(): any {
    return this.toObject();
  }
}
