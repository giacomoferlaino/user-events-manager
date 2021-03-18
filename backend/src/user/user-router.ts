import express from 'express';
import { Router } from '../shared/router';
import { UserController } from './user-controller';
import { JsonHandler } from '../shared/http/json-handler';
import { ValidationMiddleware } from '../shared/validation/validation-middleware';
import { CreateUserDto } from './dto/create-user-dto';

export class UserRouter implements Router {
  private static ID_PARAM: string = 'id';
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
      new JsonHandler(ValidationMiddleware.validateBody(CreateUserDto)).get(),
      new JsonHandler(this._userController.create()).get(),
    );

    this._router.get(
      '/:id',
      new JsonHandler(this._userController.findOne(UserRouter.ID_PARAM)).get(),
    );

    this._router.put(
      '/:id',
      new JsonHandler(ValidationMiddleware.validateBody(CreateUserDto)).get(),
      new JsonHandler(this._userController.update(UserRouter.ID_PARAM)).get(),
    );

    this._router.delete(
      '/:id',
      new JsonHandler(this._userController.remove(UserRouter.ID_PARAM)).get(),
    );

    return this;
  }
}
