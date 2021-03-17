import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventStates } from './event-states';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  headline?: string;

  @Column('text')
  description?: string;

  @Column()
  startDate?: Date;

  @Column()
  location?: string;

  @Column('varchar', { length: 20 })
  state?: EventStates;

  public static fromObject(object: any): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.id = object['id'];
    eventEntity.headline = object['headline'];
    eventEntity.description = object['description'];
    eventEntity.startDate = object['startDate'];
    eventEntity.location = object['location'];
    eventEntity.state = object['state'];
    return eventEntity;
  }
}
