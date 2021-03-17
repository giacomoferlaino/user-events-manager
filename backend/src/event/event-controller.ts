import { EventService } from './event-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { ControllerHandler } from '../shared/http/types/controller-handler';
import { Event } from './event';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { User } from '../user/user';
import { EventsLimitException } from './exceptions/events-limit-exception';
import { UnauthorizedUserException } from '../auth/exceptions/unauthorized-user-exception';
import { AlreadySubscribedException } from './exceptions/already-subscribed-exception';
import { UserService } from '../user/user-service';
import { EventOwnerException } from './exceptions/event-owner-exception';
import { SubscriptionsLimitException } from './exceptions/subscriptions-limit-exception';

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
      const user = context.req.user as User;
      if (!user.isEventOwner(eventID)) throw new UnauthorizedUserException();
      const eventData: number = context.req.body;
      const updatedEvent: Event = Event.fromObject(eventData);
      return this._eventService.updateByID(eventID, updatedEvent);
    };
  }
  public remove(): ControllerHandler<void> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params['id']);
      const user = context.req.user as User;
      if (!user.isEventOwner(eventID)) throw new UnauthorizedUserException();
      return this._eventService.removeByID(eventID);
    };
  }

  public subscribe(): ControllerHandler<void> {
    return async (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params['id']);
      const user = context.req.user as User;
      if (user.isSubscribed(eventID)) throw new AlreadySubscribedException();
      if (user.isEventOwner(eventID)) throw new EventOwnerException();
      if (user.hasReachedSubscriptionsLimit())
        throw new SubscriptionsLimitException();
      const event = await this._eventService.findByID(eventID);
      user.subscribe(event);
      await this._userService.updateByID(user.id, user);
    };
  }
}
