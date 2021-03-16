import express from 'express';
import { Router } from '../shared/router';
import { UserController } from './user-controller';

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
    this._router.get('/:id', this._userController.findOne());
    return this;
  }
}
