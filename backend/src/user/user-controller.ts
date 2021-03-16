import { Handler, NextFunction, Request, Response } from 'express';
import { UserService } from './user-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';

export class UserController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
  }
  public findOne(): Handler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<void> => {
      const userID: string = req.params['id'];
      res.json(await this._userService.findByID(userID));
    };
  }
}
