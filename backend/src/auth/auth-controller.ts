import { JwtPayload } from './strategies/jwt-payload';
import { encode } from 'jwt-simple';
import { Environment } from '../shared/environment/environment';
import { ControllerHandler } from '../shared/http/types/controller-handler';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { AuthData } from './auth-data';
import { UserService } from '../user/user-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { InvalidCredentialsException } from './exceptions/invalid-credentials-exception';

export class AuthController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
  }

  public login(): ControllerHandler<AuthData> {
    return async (context: RequestContext) => {
      const email: string = context.req.body['email'];
      const password: string = context.req.body['password'];
      const user = await this._userService.findByEmail(email);
      if (!user.comparePassword(password))
        throw new InvalidCredentialsException();
      const payload: JwtPayload = {
        userID: user.getID(),
      };
      const authToken: string = encode(payload, Environment.jwtSecret());
      return new AuthData(authToken);
    };
  }
}
