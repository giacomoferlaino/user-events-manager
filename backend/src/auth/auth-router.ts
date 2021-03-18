import express from 'express';
import { Router } from '../shared/router';
import { AuthController } from './auth-controller';
import { JsonHandler } from '../shared/http/json-handler';
import { ValidationMiddleware } from '../shared/validation/validation-middleware';
import { SignUpDto } from './dto/sign-up-dto';
import { LoginDto } from './dto/login-dto';

export class AuthRouter implements Router {
  private readonly _router: express.Router = express.Router();
  private readonly _authController: AuthController;

  constructor() {
    this._authController = new AuthController();
  }

  public get(): express.Router {
    return this._router;
  }

  public initRoutes(): Router {
    this._router.post(
      '/login',
      new JsonHandler(ValidationMiddleware.validateBody(new LoginDto())).get(),
      new JsonHandler(this._authController.login()).get(),
    );

    this._router.post(
      '/signup',
      new JsonHandler(ValidationMiddleware.validateBody(new SignUpDto())).get(),
      new JsonHandler(this._authController.signUp()).get(),
    );

    return this;
  }
}
