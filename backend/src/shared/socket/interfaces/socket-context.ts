import { Socket } from 'socket.io';

export interface SocketContext {
  socket: Socket;
  next: (err?: Error | undefined) => void;
}
