import express, { Express } from 'express';
import { Environment } from './shared/environment/environment';
import { UserRouter } from './user/user-router';
import bodyParser from 'body-parser';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth-strategy';
import { ServiceLocator } from './shared/service-locator/service-locator';
import { UserService } from './user/user-service';
import { AuthRouter } from './auth/auth-router';
import { Passport } from './passport';

function initServices(): void {
  ServiceLocator.instance.register(new UserService());
}

function main(): void {
  const PORT: number = Environment.processPort();
  const app: Express = express();

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
  app.use('/auth', new AuthRouter().initRoutes().get());

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

Environment.init(); // needed to set basic default values
initServices();
main();
