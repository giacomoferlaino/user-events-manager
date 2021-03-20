import { Socket } from 'socket.io';

export type SocketHandler = (
  socket: Socket,
  next: (err?: Error | undefined) => void,
) => void;
