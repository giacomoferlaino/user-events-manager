import { SocketContext } from '../interfaces/socket-context';

export type SocketMiddleware = (context: SocketContext) => void | Promise<void>;
