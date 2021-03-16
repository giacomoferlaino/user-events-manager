import express from 'express';

export interface Router {
  get(): express.Router;
  initRoutes(): Router;
}
