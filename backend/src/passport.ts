import passport from 'passport';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth-strategy';
import { User } from './user/user';
import { Handler } from 'express';

export class Passport {
  public static init(): Handler {
    passport.use(JwtAuthStrategy.instance.get());
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user: User, done) => {
      done(null, user);
    });
    return passport.initialize();
  }
}
