import { EventStates } from './event-states';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  public static fromObject(object: any): Event {
    return new Event(
      object['id'] || 0,
      object['headline'] || '',
      object['description'] || '',
      object['startDate'] || new Date(0),
      object['location'] || '',
      object['state'] || EventStates.Private,
      object['author'],
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
  ) {
    this.id = id;
    this.headline = headline;
    this.description = description;
    this.startDate = startDate;
    this.location = location;
    this.state = state;
    this.author = author;
  }

  public mergeIn(event: Event): Event {
    return new Event(
      this.id,
      event.headline,
      event.description,
      event.startDate,
      event.location,
      event.state,
      event.author,
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
    };
  }

  public toJSON(): any {
    return this.toObject();
  }
}
