import { Strategy, authenticate, AuthenticateOptions } from 'passport';
import passportJWT, { StrategyOptions, ExtractJwt } from 'passport-jwt';
import { UserService } from '../../user/user-service';
import { ServiceLocator } from '../../shared/service-locator/service-locator';
import { User } from '../../user/user';
import { Environment } from '../../shared/environment/environment';
import { Handler, NextFunction, Request, Response } from 'express';
import { UnauthorizedUserException } from '../exceptions/unauthorized-user-exception';
import { JwtPayload } from './jwt-payload';

export class JwtAuthStrategy {
  public static schema: string = 'Bearer';
  private static _ID: string = 'jwt';
  private static _instance: JwtAuthStrategy;
  private readonly _strategyOptions: StrategyOptions;
  private readonly _authenticationOptions: AuthenticateOptions;
  private readonly _userService: UserService;

  public static get instance(): JwtAuthStrategy {
    if (!JwtAuthStrategy._instance) {
      JwtAuthStrategy._instance = new JwtAuthStrategy();
    }
    return JwtAuthStrategy._instance;
  }

  private constructor() {
    this._userService = ServiceLocator.instance.get(
      UserService.ID,
    ) as UserService;
    this._strategyOptions = {
      secretOrKey: Environment.jwtSecret(),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    };
    this._authenticationOptions = { session: false };
  }

  public get(): Strategy {
    return new passportJWT.Strategy(
      this._strategyOptions,
      async (payload: JwtPayload, done) => {
        const userID: number = payload.userID;
        try {
          const user: User = await this._userService.findByID(userID);
          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      },
    );
  }

  public authenticate(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
      authenticate(JwtAuthStrategy._ID, (err: Error, user: User) => {
        if (err) {
          next(new UnauthorizedUserException());
          return;
        }
        if (!user) {
          next(new UnauthorizedUserException());
          return;
        }
        req.user = user;
        next();
      })(req, res, next);
    };
  }
}
