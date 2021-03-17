import { RequestContext } from '../interfaces/request-context';

export type ControllerHandler<T> = (context: RequestContext) => Promise<T>;
