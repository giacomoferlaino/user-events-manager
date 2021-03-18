import { EventService } from './event-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { ControllerHandler } from '../shared/http/types/controller-handler';
import { Event } from './event';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { User } from '../user/user';
import { UserService } from '../user/user-service';
import { CreateEventDto } from './dto/create-event-dto';

export class EventController {
  private readonly _eventService: EventService;
  private readonly _userService: UserService;

  constructor() {
    this._eventService = ServiceLocator.instance.get(
      EventService.ID,
    ) as EventService;
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
  }

  public findOne(idParam: string): ControllerHandler<Event> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      return this._eventService.findByID(eventID);
    };
  }

  public findAll(): ControllerHandler<Event[]> {
    return (_: RequestContext) => {
      return this._eventService.findAll();
    };
  }

  public create(): ControllerHandler<Event> {
    return (context: RequestContext) => {
      const currentUser = context.req.user as User;
      const eventData: CreateEventDto = context.req.body;
      eventData.author = currentUser;
      const event: Event = Event.fromObject(eventData);
      return this._eventService.create(event);
    };
  }

  public update(idParam: string): ControllerHandler<Event> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      const eventData: CreateEventDto = context.req.body;
      const updatedEvent: Event = Event.fromObject(eventData);
      return this._eventService.updateByID(eventID, updatedEvent);
    };
  }

  public remove(idParam: string): ControllerHandler<Event[]> {
    return async (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      await this._eventService.removeByID(eventID);
      return [];
    };
  }

  public subscribe(idParam: string): ControllerHandler<Event[]> {
    return async (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      const user = context.req.user as User;
      const event = await this._eventService.findByID(eventID);
      user.subscribe(event);
      await this._userService.updateByID(user.id, user);
      return [];
    };
  }
}
