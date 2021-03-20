import 'reflect-metadata'; // needed for TypeORM to work
import { ServiceLocator } from './shared/service-locator/service-locator';
import { UserService } from './user/user-service';
import { Database } from './database';
import { Connection } from 'typeorm';
import { EventService } from './event/event-service';
import { initSocketServer } from './socket-server';
import { initAPIServer } from './api-server';
import { Environment } from './shared/environment/environment';

async function initServices(): Promise<void> {
  const dbConnection: Connection = await Database.createConnection();
  ServiceLocator.instance.register(new UserService(dbConnection));
  ServiceLocator.instance.register(new EventService(dbConnection));
}

async function main(): Promise<void> {
  Environment.init(); // needed to set basic default values
  await initServices(); // init global services

  await initAPIServer();

  await initSocketServer();
}

main().then();
