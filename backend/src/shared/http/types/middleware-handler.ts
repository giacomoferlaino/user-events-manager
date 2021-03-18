import { RequestContext } from '../interfaces/request-context';

export type MiddlewareHandler<T> = (context: RequestContext) => T | Promise<T>;
