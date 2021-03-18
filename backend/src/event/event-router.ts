import express from 'express';
import { Router } from '../shared/router';
import { EventController } from './event-controller';
import { JsonHandler } from '../shared/http/json-handler';
import { JwtAuthStrategy } from '../auth/strategies/jwt-auth-strategy';
import { EventMiddleware } from './event-middleware';
import { ValidationMiddleware } from '../shared/validation/validation-middleware';
import { CreateEventDto } from './dto/create-event-dto';

export class EventRouter implements Router {
  private static ID_PARAM: string = 'id';
  private readonly _router: express.Router = express.Router();
  private readonly _eventController: EventController;

  constructor() {
    this._eventController = new EventController();
  }

  public get(): express.Router {
    return this._router;
  }

  public initRoutes(): Router {
    this._router.get(
      '/',
      new JsonHandler(this._eventController.findAll()).get(),
    );

    this._router.post(
      '/',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(EventMiddleware.denyOnCreationLimit()).get(),
      new JsonHandler(ValidationMiddleware.validateBody(CreateEventDto)).get(),
      new JsonHandler(this._eventController.create()).get(),
    );

    this._router.post(
      '/:id/subscribe',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(
        EventMiddleware.denyDuplicateSubscription(EventRouter.ID_PARAM),
      ).get(),
      new JsonHandler(
        EventMiddleware.denyOwnerSubscription(EventRouter.ID_PARAM),
      ).get(),
      new JsonHandler(EventMiddleware.denyOnSubscriptionLimit()).get(),
      new JsonHandler(
        this._eventController.subscribe(EventRouter.ID_PARAM),
      ).get(),
    );

    this._router.get(
      '/:id',
      new JsonHandler(
        this._eventController.findOne(EventRouter.ID_PARAM),
      ).get(),
    );

    this._router.put(
      '/:id',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(
        EventMiddleware.allowOnlyOwner(EventRouter.ID_PARAM),
      ).get(),
      new JsonHandler(ValidationMiddleware.validateBody(CreateEventDto)).get(),
      new JsonHandler(this._eventController.update(EventRouter.ID_PARAM)).get(),
    );

    this._router.delete(
      '/:id',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(
        EventMiddleware.allowOnlyOwner(EventRouter.ID_PARAM),
      ).get(),
      new JsonHandler(this._eventController.remove(EventRouter.ID_PARAM)).get(),
    );

    return this;
  }
}
