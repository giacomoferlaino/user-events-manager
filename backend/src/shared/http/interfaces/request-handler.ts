import { Handler } from 'express';

export interface RequestHandler {
  get(): Handler;
}
