import { Strategy } from 'passport';

export interface AuthStrategy {
  ID: string;
  get(): Strategy;
}
