import { DataTransferObject } from '../../shared/validation/data-transfer-object';
import { EventStates } from '../event-states';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../user/user';

export class CreateEventDto implements DataTransferObject {
  @IsNotEmpty()
  @IsString()
  headline!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsDate()
  startDate!: Date;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsEnum(EventStates)
  state!: EventStates;

  author!: User;

  populateFromObject(source: any) {
    this.headline = source['headline'];
    this.description = source['description'];
    this.startDate = new Date(source['startDate']);
    this.location = source['location'];
    this.state = source['state'];
  }
}
