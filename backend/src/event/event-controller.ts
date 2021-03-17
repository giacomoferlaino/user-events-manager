import { EventService } from './event-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { ControllerHandler } from '../shared/http/types/controller-handler';
import { Event } from './event';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { User } from '../user/user';
import { EventsLimitException } from './exceptions/events-limit-exception';

export class EventController {
  private readonly _eventService: EventService;

  constructor() {
    this._eventService = ServiceLocator.instance.get(
      EventService.ID,
    ) as EventService;
  }

  public findOne(): ControllerHandler<Event> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params['id']);
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
      const user = context.req.user as User;
      if (user.hasReachedEventsLimit()) throw new EventsLimitException();
      const eventData: any = context.req.body;
      eventData.author = context.req.user;
      const event: Event = Event.fromObject(eventData);
      return this._eventService.create(event);
    };
  }

  public update(): ControllerHandler<Event> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params['id']);
      const eventData: number = context.req.body;
      const event: Event = Event.fromObject(eventData);
      return this._eventService.updateByID(eventID, event);
    };
  }
  public remove(): ControllerHandler<void> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params['id']);
      return this._eventService.removeByID(eventID);
    };
  }
}
