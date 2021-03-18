import { UserService } from './user-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { User } from './user';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { ControllerHandler } from '../shared/http/types/controller-handler';

export class UserController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
  }

  public findOne(idParam: string): ControllerHandler<User> {
    return (context: RequestContext) => {
      const userID: number = parseInt(context.req.params[idParam]);
      return this._userService.findByID(userID);
    };
  }

  public findAll(): ControllerHandler<User[]> {
    return (_: RequestContext) => {
      return this._userService.findAll();
    };
  }

  public create(): ControllerHandler<User> {
    return (context: RequestContext) => {
      const userData: number = context.req.body;
      const user: User = User.fromObject(userData);
      return this._userService.create(user);
    };
  }

  public update(idParam: string): ControllerHandler<User> {
    return (context: RequestContext) => {
      const userID: number = parseInt(context.req.params[idParam]);
      const userData: number = context.req.body;
      const user: User = User.fromObject(userData);
      return this._userService.updateByID(userID, user);
    };
  }
  public remove(idParam: string): ControllerHandler<User[]> {
    return async (context: RequestContext) => {
      const userID: number = parseInt(context.req.params[idParam]);
      await this._userService.removeByID(userID);
      return [];
    };
  }
}
