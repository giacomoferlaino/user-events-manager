import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../event/event';

@Entity()
export class User {
  private readonly EVENTS_LIMIT: number = 1;

  @PrimaryGeneratedColumn()
  public readonly id: number;

  @Column()
  public readonly username: string;

  @Column()
  public readonly email: string;

  @Column()
  public readonly password: string;

  @OneToMany((_) => Event, (event) => event.author)
  public readonly events: Event[];

  public static fromObject(object: any): User {
    return new User(
      object['id'] || 0,
      object['username'] || '',
      object['email'] || '',
      object['password'] || '',
      object['events'] || [],
    );
  }

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    events: Event[],
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.events = events;
  }

  public mergeIn(user: User): User {
    return new User(
      this.id,
      user.username,
      user.email,
      user.password,
      user.events,
    );
  }

  public comparePassword(password: string): boolean {
    return this.password === password;
  }

  public hasReachedEventsLimit(): boolean {
    const isWithinLimits: boolean = this.events.length < this.EVENTS_LIMIT;
    return !isWithinLimits;
  }

  public isEventOwner(eventID: number): boolean {
    return this.events.some((event: Event) => event.id === eventID);
  }

  public toObject(): any {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
      events: this.events,
    };
  }

  public toJSON(): any {
    return { ...this.toObject(), password: undefined };
  }
}
