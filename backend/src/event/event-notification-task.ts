import { Server, RemoteSocket } from 'socket.io';
import { SocketServerTask } from '../shared/socket/socket-server-task';
import { EventService } from './event-service';
import { ServiceLocator } from '../shared/service-locator/service-locator';
import { Event } from './event';

export class EventNotificationTask implements SocketServerTask {
  public static updateInterval = 5000;
  public static eventNotificationId: string = 'eventNotification';
  private _intervalInstance!: NodeJS.Timeout;
  private _eventService: EventService;
  private _jobRunning = false; // prevents parallel execution

  constructor(private _socketServer: Server) {
    this._eventService = ServiceLocator.instance.get<EventService>(
      EventService.ID,
    );
  }

  public start(): void {
    this._intervalInstance = setInterval(async () => {
      if (this._jobRunning) return;
      const events = await this._eventService.findToBeNotified();
      const sockets = await this._socketServer.fetchSockets();
      await this.sendToSubscribedUsers(events, sockets);
    }, EventNotificationTask.updateInterval);
  }

  public async sendToSubscribedUsers(
    events: Event[],
    sockets: RemoteSocket<any>[],
  ): Promise<void> {
    if (sockets.length === 0) return;
    this._jobRunning = true;
    for (const event of events) {
      for (const socket of sockets) {
        const socketUser = (socket as any).request.user;
        if (event.hasSubscriber(socketUser.id)) {
          this.send(socket, event);
        }
      }
      event.setNotified();
      await this._eventService.updateByID(event.id, event);
    }
    this._jobRunning = false;
  }

  public send(socket: RemoteSocket<any>, event: Event): void {
    socket.emit(EventNotificationTask.eventNotificationId, event.toString());
  }

  public stop(): void {
    clearInterval(this._intervalInstance);
  }
}
