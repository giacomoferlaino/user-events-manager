import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../event/event';
import { compare } from 'bcryptjs';

@Entity()
export class User {
  private readonly EVENTS_LIMIT: number = 1;
  private readonly SUBSCRIPTIONS_LIMIT: number = 3;

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column({ unique: true })
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string; // hashed user password

  @OneToMany((_) => Event, (event) => event.author)
  public readonly events: Event[];

  @ManyToMany((_) => Event, (event) => event.subscribers)
  @JoinTable()
  public readonly subscribedEvents: Event[];

  public static fromObject(object: any): User {
    return new User(
      object['id'] || 0,
      object['username'] || '',
      object['email'] || '',
      object['password'] || '',
      object['events'] || [],
      object['subscribedEvents'] || [],
    );
  }

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    events: Event[],
    subscribedEvents: Event[],
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.events = events;
    this.subscribedEvents = subscribedEvents;
  }

  public mergeObject(object: any): User {
    return User.fromObject({
      ...this.toObject(),
      ...object,
      id: this.id, // preserving existing id
    });
  }

  public async comparePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.password);
  }

  public hasReachedEventsLimit(): boolean {
    const isWithinLimits: boolean = this.events.length < this.EVENTS_LIMIT;
    return !isWithinLimits;
  }

  public hasReachedSubscriptionsLimit(): boolean {
    const isWithinLimits: boolean =
      this.subscribedEvents.length < this.SUBSCRIPTIONS_LIMIT;
    return !isWithinLimits;
  }

  public subscribe(event: Event): void {
    this.subscribedEvents.push(event);
  }

  public isEventOwner(eventID: number): boolean {
    return this.events.some((event: Event) => event.id === eventID);
  }

  public isSubscribed(eventID: number): boolean {
    return this.subscribedEvents.some((event: Event) => event.id === eventID);
  }

  public toObject(): any {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      events: this.events,
      subscribedEvents: this.subscribedEvents,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), password: undefined };
  }
}
