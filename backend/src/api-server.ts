import { Environment } from './shared/environment/environment';
import express, { Express } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Passport } from './passport';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth-strategy';
import { UserRouter } from './user/user-router';
import { EventRouter } from './event/event-router';
import { AuthRouter } from './auth/auth-router';
import { HttpErrorHandler } from './shared/http/http-error-handler';

export async function initAPIServer(): Promise<void> {
  const PORT: number = Environment.processPort();
  const app: Express = express();

  // enables all cors requests
  app.use(cors());

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  // parse application/json
  app.use(bodyParser.json());

  app.use(Passport.init());

  app.use(
    '/user',
    JwtAuthStrategy.instance.authenticate(),
    new UserRouter().initRoutes().get(),
  );
  app.use('/event', new EventRouter().initRoutes().get());
  app.use('/auth', new AuthRouter().initRoutes().get());
  app.use(new HttpErrorHandler().get());

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}
