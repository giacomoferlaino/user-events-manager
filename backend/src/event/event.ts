import { EventStates } from './event-states';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user';
import { MissingAuthorException } from './exceptions/missing-author-exception';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly headline: string;

  @Column('text')
  public description: string;

  @Column('datetime')
  public startDate: Date;

  @Column()
  public location: string;

  @Column('varchar', { length: 20 })
  public state: EventStates;

  @Column()
  public hasBeenNotified: boolean;

  @ManyToOne((_) => User, (user) => user.events)
  public author: User;

  @ManyToMany((_) => User, (user) => user.subscribedEvents)
  public readonly subscribers: User[];

  public static fromObject(object: any): Event {
    if (!object['author']) throw new MissingAuthorException();
    return new Event(
      object['id'] || 0,
      object['headline'] || '',
      object['description'] || '',
      object['startDate'] || new Date(0),
      object['location'] || '',
      object['state'] || EventStates.Private,
      object['author'], // author can't be no defined
      object['subscribers'] || [],
      object['hasBeenNotified'],
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
    hasBeenNotified: boolean = false,
  ) {
    this.id = id;
    this.headline = headline;
    this.description = description;
    this.startDate = startDate;
    this.location = location;
    this.state = state;
    this.author = author;
    this.subscribers = subscribers;
    this.hasBeenNotified = hasBeenNotified;
  }

  public setAuthor(author: User) {
    this.author = author;
  }

  public setNotified(): void {
    this.hasBeenNotified = true;
  }

  public hasSubscriber(userId: number): boolean {
    return this.subscribers.some((user: User) => userId === user.id);
  }

  public mergeObject(object: any): Event {
    return Event.fromObject({
      ...this.toObject(),
      ...object,
      id: this.id, // preserving existing id
    });
  }

  public toObject(): any {
    return {
      id: this.id,
      headline: this.headline,
      description: this.description,
      startDate: this.startDate,
      location: this.location,
      state: this.state,
      hasBeenNotified: this.hasBeenNotified,
      author: this.author,
      subscribers: this.subscribers,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), author: undefined, subscribers: undefined };
  }

  public toString(): string {
    return `${this.headline} - ${this.startDate} @${this.location}`;
  }
}
