import express from 'express';
import { Router } from '../shared/router';
import { EventController } from './event-controller';

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
    return this;
  }
}
