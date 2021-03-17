import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EventEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  headline?: string;

  @Column()
  description?: string;

  @Column()
  startDate?: Date;

  @Column()
  location?: string;

  public static fromObject(object: any): EventEntity {
    const eventEntity = new EventEntity();
    eventEntity.id = object['id'];
    eventEntity.headline = object['headline'];
    eventEntity.description = object['description'];
    eventEntity.startDate = object['startDate'];
    eventEntity.location = object['location'];
    return eventEntity;
  }
}
