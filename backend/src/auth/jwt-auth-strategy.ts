import { Strategy } from 'passport';
import passportJWT, { StrategyOptions } from 'passport-jwt';

export class JwtAuthStrategy {
  public static ID: string = 'jwtStrategy';
  public static scheme: string = 'jwt';
  private readonly _options: StrategyOptions;

  constructor(secret: string) {
    this._options = {
      secretOrKey: secret,
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderWithScheme(
        JwtAuthStrategy.scheme,
      ),
    };
  }

  public get(): Strategy {
    return new passportJWT.Strategy(this._options, () => {});
  }
}
