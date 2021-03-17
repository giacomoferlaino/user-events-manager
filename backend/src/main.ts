import 'reflect-metadata'; // needed for TypeORM to work
import express, { Express } from 'express';
import { Environment } from './shared/environment/environment';
import { UserRouter } from './user/user-router';
import bodyParser from 'body-parser';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth-strategy';
import { ServiceLocator } from './shared/service-locator/service-locator';
import { UserService } from './user/user-service';
import { AuthRouter } from './auth/auth-router';
import { Passport } from './passport';
import { Database } from './database';
import { Connection } from 'typeorm';
import { HttpErrorHandler } from './shared/http/http-error-handler';
import { EventRouter } from './event/event-router';
import { EventService } from './event/event-service';

async function initServices(): Promise<void> {
  const dbConnection: Connection = await Database.createConnection();
  ServiceLocator.instance.register(new UserService(dbConnection));
  ServiceLocator.instance.register(new EventService(dbConnection));
}

async function main(): Promise<void> {
  Environment.init(); // needed to set basic default values
  await initServices(); // init global services

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
  app.use(
    '/event',
    JwtAuthStrategy.instance.authenticate(),
    new EventRouter().initRoutes().get(),
  );
  app.use('/auth', new AuthRouter().initRoutes().get());
  app.use(new HttpErrorHandler().get());

  app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`);
  });
}

main().then();
