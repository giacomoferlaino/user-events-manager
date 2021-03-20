import { RequestContext } from '../interfaces/request-context';

export type HttpMiddleware<T> = (context: RequestContext) => T | Promise<T>;
