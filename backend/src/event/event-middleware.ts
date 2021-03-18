import { RequestContext } from '../shared/http/interfaces/request-context';
import { User } from '../user/user';
import { AlreadySubscribedException } from './exceptions/already-subscribed-exception';
import { MiddlewareHandler } from '../shared/http/types/middleware-handler';
import { EventOwnerException } from './exceptions/event-owner-exception';
import { EventsSubscriptionLimitException } from './exceptions/events-subscription-limit-exception';
import { UnauthorizedUserException } from '../auth/exceptions/unauthorized-user-exception';
import { EventsCreationLimitException } from './exceptions/events-creation-limit-exception';

export class EventMiddleware {
  public static denyDuplicateSubscription(
    idParam: string,
  ): MiddlewareHandler<void> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      const user = context.req.user as User;
      if (user.isSubscribed(eventID)) throw new AlreadySubscribedException();
    };
  }

  public static denyOwnerSubscription(
    idParam: string,
  ): MiddlewareHandler<void> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      const user = context.req.user as User;
      if (user.isEventOwner(eventID)) throw new EventOwnerException();
    };
  }

  public static denyOnSubscriptionLimit(): MiddlewareHandler<void> {
    return (context: RequestContext) => {
      const user = context.req.user as User;
      if (user.hasReachedSubscriptionsLimit())
        throw new EventsSubscriptionLimitException();
    };
  }

  public static denyOnCreationLimit(): MiddlewareHandler<void> {
    return (context: RequestContext) => {
      const user = context.req.user as User;
      if (user.hasReachedEventsLimit())
        throw new EventsCreationLimitException();
    };
  }

  public static allowOnlyOwner(idParam: string): MiddlewareHandler<void> {
    return (context: RequestContext) => {
      const eventID: number = parseInt(context.req.params[idParam]);
      const user = context.req.user as User;
      if (user.isEventOwner(eventID)) throw new UnauthorizedUserException();
    };
  }
}
