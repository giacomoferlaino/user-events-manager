import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { JwtAuthStrategy } from './auth/strategies/jwt-auth-strategy';
import { EventNotificationTask } from './event/event-notification-task';

// convert a connect middleware to a Socket.IO middleware
const wrap = (middleware: any) => (
  socket: Socket,
  next: (err?: Error | undefined) => void,
) => middleware(socket.request, {}, next);

export function initSocketServer(): void {
  const port: number = 8081;

  const httpServer = createServer();
  const socketServer = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });
  const eventNotificationJob = new EventNotificationTask(socketServer);

  socketServer.use(wrap(JwtAuthStrategy.instance.authenticate()));

  socketServer.on('connection', (socket: Socket) => {
    console.log(`Socket ${socket.id} has connected!`);
    socket.on('disconnect', () => {
      console.log(`Socket ${socket.id} has disconnected!`);
    });
  });

  httpServer.listen(port, () => {
    eventNotificationJob.start();
    console.log(`Socket server started on port: ${port}`);
  });
}
