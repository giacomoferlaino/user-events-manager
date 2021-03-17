import express from 'express';
import { Router } from '../shared/router';
import { EventController } from './event-controller';
import { JsonHandler } from '../shared/http/json-handler';
import { JwtAuthStrategy } from '../auth/strategies/jwt-auth-strategy';

export class EventRouter implements Router {
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
      new JsonHandler(this._eventController.create()).get(),
    );
    this._router.get(
      '/:id',
      new JsonHandler(this._eventController.findOne()).get(),
    );
    this._router.put(
      '/:id',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(this._eventController.update()).get(),
    );
    this._router.delete(
      '/:id',
      JwtAuthStrategy.instance.authenticate(),
      new JsonHandler(this._eventController.remove()).get(),
    );
    return this;
  }
}
