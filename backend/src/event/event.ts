import { EventStates } from './event-states';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user';

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

  @ManyToOne((_) => User, (user) => user.events)
  public readonly author: User;

  @ManyToMany((_) => User, (user) => user.subscribedEvents)
  public readonly subscribers: User[];

  public static fromObject(object: any): Event {
    return new Event(
      object['id'] || 0,
      object['headline'] || '',
      object['description'] || '',
      object['startDate'] || new Date(0),
      object['location'] || '',
      object['state'] || EventStates.Private,
      object['author'],
      object['subscribers'] || [],
    );
  }

  constructor(
    id: number,
    headline: string,
    description: string,
    startDate: Date,
    location: string,
    state: EventStates,
    author: User,
    subscribers: User[],
  ) {
    this.id = id;
    this.headline = headline;
    this.description = description;
    this.startDate = startDate;
    this.location = location;
    this.state = state;
    this.author = author;
    this.subscribers = subscribers;
  }

  public mergeIn(event: Event): Event {
    return new Event(
      this.id, // id should be preserved
      event.headline,
      event.description,
      event.startDate,
      event.location,
      event.state,
      this.author, // relationship field left ou during merge
      this.subscribers, // relationship field left ou during merge
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
      author: this.author,
      subscribers: this.subscribers,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), author: undefined, subscribers: undefined };
  }
}
