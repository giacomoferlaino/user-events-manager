import { EventStates } from './event-states';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly headline: string;

  @Column('text')
  public readonly description: string;

  @Column()
  public readonly startDate: Date;

  @Column()
  public readonly location: string;

  @Column('varchar', { length: 20 })
  public readonly state: EventStates;

  public static fromObject(object: any): Event {
    return new Event(
      object['id'] || 0,
      object['headline'] || '',
      object['description'] || '',
      (object['startDate'] = new Date(0)),
      object['location'] || '',
      (object['state'] = EventStates.Private),
    );
  }

  constructor(
    id: number,
    headline: string,
    description: string,
    startDate: Date,
    location: string,
    state: EventStates,
  ) {
    this.id = id;
    this.headline = headline;
    this.description = description;
    this.startDate = startDate;
    this.location = location;
    this.state = state;
  }

  public mergeIn(event: Event): Event {
    return new Event(
      this.id,
      event.headline,
      event.description,
      event.startDate,
      event.location,
      event.state,
    );
  }

  public toObject(): any {
    return {
      id: this.id,
      headline: this.headline,
      description: this.description,
      startDate: this.startDate,
      location: this.location,
      state: this.state,
    };
  }

  public toJSON(): any {
    return this.toObject();
  }
}
