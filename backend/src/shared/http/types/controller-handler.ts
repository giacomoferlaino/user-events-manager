import { RequestContext } from '../interfaces/request-context';

export type ControllerHandler<T extends Object> = (
  context: RequestContext,
) => T | Promise<T>;
