import { JwtPayload } from './strategies/jwt-payload';
import { encode } from 'jwt-simple';
import { Environment } from '../shared/environment/environment';
import { ControllerHandler } from '../shared/http/types/controller-handler';
import { RequestContext } from '../shared/http/interfaces/request-context';
import { AuthData } from './auth-data';
import { UserService } from '../user/user-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { InvalidCredentialsException } from './exceptions/invalid-credentials-exception';
import { User } from '../user/user';
import { JwtAuthStrategy } from './strategies/jwt-auth-strategy';
import { SignUpDto } from './dto/sign-up-dto';
import { LoginDto } from './dto/login-dto';

export class AuthController {
  private readonly _userService: UserService;

  constructor() {
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
  }

  public login(): ControllerHandler<AuthData> {
    return async (context: RequestContext) => {
      const reqBody = context.req.body as LoginDto;
      const user = await this._userService.findByEmail(reqBody.email);
      if (!user.comparePassword(reqBody.password))
        throw new InvalidCredentialsException();
      const payload: JwtPayload = {
        userID: user.id,
      };
      const authToken: string = encode(payload, Environment.jwtSecret());
      const authTokenWithSchema = `${JwtAuthStrategy.schema} ${authToken}`;
      return new AuthData(authTokenWithSchema);
    };
  }

  public signUp(): ControllerHandler<User> {
    return (context: RequestContext) => {
      const reqBody = context.req.body as SignUpDto;
      const user = User.fromObject({ ...reqBody });
      return this._userService.create(user);
    };
  }
}
