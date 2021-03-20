import { SocketMiddleware } from './types/socket-middleware';
import { SocketHandler } from './types/socket-handler';
import { SocketContext } from './interfaces/socket-context';
import { Socket } from 'socket.io';

export class SocketIoHandler {
  constructor(private _callback: SocketMiddleware) {}

  public get(): SocketHandler {
    return async (
      socket: Socket,
      next: (err?: Error | undefined) => void,
    ): Promise<void> => {
      const context: SocketContext = { socket, next };
      try {
        await this._callback(context);
        next();
      } catch (err) {
        next(err);
        socket.disconnect();
      }
    };
  }
}
