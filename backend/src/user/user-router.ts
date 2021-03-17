import express from 'express';
import { Router } from '../shared/router';
import { UserController } from './user-controller';
import { JsonHandler } from '../shared/http/json-handler';

export class UserRouter implements Router {
  private readonly _router: express.Router = express.Router();
  private readonly _userController: UserController;

  constructor() {
    this._userController = new UserController();
  }

  public get(): express.Router {
    return this._router;
  }

  public initRoutes(): Router {
    this._router.get(
      '/',
      new JsonHandler(this._userController.findAll()).get(),
    );
    this._router.post(
      '/',
      new JsonHandler(this._userController.create()).get(),
    );
    this._router.get(
      '/:id',
      new JsonHandler(this._userController.findOne()).get(),
    );
    this._router.delete(
      '/:id',
      new JsonHandler(this._userController.remove()).get(),
    );
    return this;
  }
}
