import { Request, Response, NextFunction, Handler } from 'express';
import { JwtPayload } from './strategies/jwt-payload';
import { encode } from 'jwt-simple';
import { Environment } from '../shared/environment/environment';
import { JwtAuthStrategy } from './strategies/jwt-auth-strategy';

export class AuthController {
  public login(): Handler {
    return (req: Request, res: Response, next: NextFunction): void => {
      const payload: JwtPayload = {
        userID: 'mockedID',
      };
      const authToken: string = encode(payload, Environment.jwtSecret());
      res.json({
        token: `${JwtAuthStrategy.schema} ${authToken}`,
      });
    };
  }
}
